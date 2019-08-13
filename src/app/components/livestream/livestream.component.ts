import { Component, OnInit, OnDestroy } from '@angular/core';
import { AvstreamerService } from 'src/app/services/avstreamer/avstreamer.service';
import { WalkyService } from 'src/app/services/walky/walky.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit, OnDestroy {
  isWalkyAvailable = false;
  isRecordingDwnldAvailable = false;
  videoLink = '';
  audioLink = '';
  constructor(public avStreamer: AvstreamerService, public walky: WalkyService) {
  }

  recordingDone(recordingData) {
    console.log(recordingData);
  }

  recordingErr(err) {
    console.log(err);
  }

  ngOnInit() {
    this.avStreamer.connect();
    this.avStreamer.isLoaded = true;
    this.avStreamer.onRecordingDone(this.recordingDone);
    this.avStreamer.onRecordingErr(this.recordingErr);
    if (this.walky.config) {
      this.isWalkyAvailable = true;
      this.walky.connect();
    }
    setInterval(() => {
      if (this.avStreamer.recordingData) {
        const crntTime =  new Date().getTime();
        // Show recording button for 10 mins from the last recording time
        let timeDiff = (crntTime - this.avStreamer.recordingData.timestamp);
        timeDiff = Math.floor(timeDiff / 60000);
        if (timeDiff > 10) {
          this.isRecordingDwnldAvailable = false;
          // Assign the value to the download link
        } else {
          this.isRecordingDwnldAvailable = true;
        }
      }
    }, 5000);
    // Refreshing live feed, passing random value to trick img refresh the feed
    setTimeout(() => {
      this.videoLink = this.avStreamer.config.videoUrl + '?from=' + Date.now().toString();
      this.audioLink = this.avStreamer.config.audioUrl + '?from=' + Date.now().toString();
    },
    5000);
  }

  reloadImage() {
    setTimeout(() => {
      this.videoLink = this.avStreamer.config.videoUrl + '?from=' + Date.now().toString();
      this.audioLink = this.avStreamer.config.audioUrl + '?from=' + Date.now().toString();
    },
    5000);
  }

  ngOnDestroy() {
    this.avStreamer.isLoaded = false;
    this.walky.disconnect();
    if (!this.avStreamer.recordingData.isRecording) {
      this.avStreamer.disconnect();
    }
  }
}
