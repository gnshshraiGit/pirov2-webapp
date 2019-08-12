import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppsettingsService } from '../appsettings/appsettings.service';

@Injectable({
  providedIn: 'root'
})

export class WalkyService extends Socket {
  config;
  constructor(private appSettings: AppsettingsService) {
    super({
      url: (() => {
        const svcConfig = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.walkyServiceTypeKey);
        if (svcConfig && svcConfig.enabled) {
          return svcConfig.sockUrl;
        }
        return '';
    })()});
    this.config = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.walkyServiceTypeKey);
    this.disconnect(); // lazy loading keep disconnected until injected
  }

  goFwd() {
    this.emit(this.config.goFwdEvent);
  }

  goBkd() {
    this.emit(this.config.goBkdEvent);
  }

  goRit() {
    this.emit(this.config.goRitEvent);
  }

  goLft() {
    this.emit(this.config.goLftEvent);
  }

  stop() {
    this.emit(this.config.stopEvent);
  }

  onServing(servingCallback) {
    this.on(this.config.servingEvent, servingCallback);
  }

  onBlockDetected(blockDetectedCallback) {
    this.on(this.config.blockDetectEvent, blockDetectedCallback);
  }
}
