import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppsettingsService } from '../appsettings/appsettings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUrlScheme } from '@angular/compiler';

export interface RecordingData {
  filename: string;
  timestamp: number;
  isRecording: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AvstreamerService extends Socket {
  config;
  isLoaded = false;
  recordingDwnloadLink: string;
  recordingData: RecordingData = {
    filename: '',
    timestamp: new Date(2000, 1, 1).getTime(),
    isRecording: false
  };
  constructor(private appSettings: AppsettingsService, private snackBar: MatSnackBar) {
      super({
        url: (() => {
          const svcConfig = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.avStreamerServiceTypeKey);
          if (svcConfig && svcConfig.enabled) {
            return svcConfig.sockUrl;
          }
          return '';
      })()});
      this.config = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.avStreamerServiceTypeKey);
      this.disconnect(); // lazy loading keep disconnected until injected
  }

  startRecording() {
    this.recordingData.isRecording = true;
    this.emit(this.config.startRecordEvent);
  }

  onRecordingDone(recordDoneCallback) {
    this.on(this.config.recordingDoneEvent, (data) => {
      this.recordingData.filename = data.filename;
      this.recordingData.timestamp = new Date().getTime();
      this.recordingData.isRecording = false;
      this.recordingDwnloadLink = this.config.getRecordingUrl + this.recordingData.filename;
      this.openRecordingDoneNotification();
      if (!this.isLoaded) {
        this.disconnect();
      } else {
        recordDoneCallback(this.recordingData);
      }
    });
  }

  onRecordingErr(recordErrCallback) {
    this.on(this.config.recordingErrEvent, (data) => {
      this.recordingData.isRecording = data.success || data.recording;
      const message = this.recordingData.isRecording ? 'Recording Started' : 'Error Occured';
      this.openRecordingErrNotification(message);
      if (!this.isLoaded) {
        this.disconnect();
      } else {
        recordErrCallback(data);
      }
    });
  }

  openRecordingDoneNotification() {
    this.snackBar.open('Recording ready to download', 'Close', {
      duration: 5000
    });
  }

  openRecordingErrNotification(message) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
