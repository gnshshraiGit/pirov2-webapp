import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppsettingsService } from '../appsettings/appsettings.service';

@Injectable({
  providedIn: 'root'
})

export class AmbientService extends Socket {
  config: any;
  tempC: number;
  tempF: number;
  pressurehPa: number;
  pressureHg: number;
  humidity: number;
  constructor(private appSettings: AppsettingsService) {
    super({
      url: (() => {
        const svcConfig = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.ambientServiceTypeKey);
        if (svcConfig && svcConfig.enabled) {
          return svcConfig.sockUrl;
        }
        return '';
    })()});
    this.config = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.ambientServiceTypeKey);
    this.on(this.config.ambientEvent, (data) => {
      this.tempC = data.pthdata.temperature_C;
      this.tempF = data.pthdata.temperature_F;
      this.pressurehPa = data.pthdata.pressure_hPa;
      this.pressureHg = data.pthdata.pressure_inHg;
      this.humidity = data.pthdata.humidity;
    });
    this.disconnect(); // lazy loading keep disconnected until injected
  }
}

