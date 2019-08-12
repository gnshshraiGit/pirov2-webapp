import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AppsettingsService } from './services/appsettings/appsettings.service';
import { AppinitializerService } from './services/appinitializer/appinitializer.service';
import { AvstreamerService } from './services/avstreamer/avstreamer.service';
import { LivestreamComponent } from './components/livestream/livestream.component';
import { AmbientComponent } from './components/ambient/ambient.component';
import { WalkyService } from './services/walky/walky.service';
import { AmbientService } from './services/ambient/ambient.service';


export function initializeApp(appInitService: AppinitializerService) {
  return () => appInitService.getUIConfigs();
}

@NgModule({
  declarations: [
    AppComponent,
    LivestreamComponent,
    AmbientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    GoogleChartsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppinitializerService], multi: true },
    AppsettingsService,
    AvstreamerService,
    WalkyService,
    AmbientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
