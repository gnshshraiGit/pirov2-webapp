import { Component, ViewChild } from '@angular/core';
import { AppsettingsService } from './services/appsettings/appsettings.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
    title = 'Pirov2-webapp';
    screenWidth: number;
    @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
    isLiveAvailable = false;
    isAmbienceAvailable = false;
    featuresCount = 0;
    constructor(private appSettings: AppsettingsService) {
      // set screenWidth on page load
      this.screenWidth = window.innerWidth;
      window.onresize = () => {
        // set screenWidth on screen size change
        this.screenWidth = window.innerWidth;
      };

      let svcConfig = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.ambientServiceTypeKey);
      if (svcConfig) {
        this.isAmbienceAvailable = svcConfig.enabled;
        this.featuresCount++;
      }
      svcConfig = appSettings.uiConfig.find(conf => conf.serviceType === appSettings.avStreamerServiceTypeKey);
      if (svcConfig) {
        this.isLiveAvailable = svcConfig.enabled;
        this.featuresCount++;
      }
  }

  navToggle() {
    this.screenWidth <= 840 ? this.sidenav.toggle() : this.sidenav.open();
  }
}
