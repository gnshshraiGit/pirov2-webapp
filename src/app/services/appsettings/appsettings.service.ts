import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {
  baseAddress = '192.168.1.11:8080';
  uiConfigUrl = 'http://' + this.baseAddress + '/app/uiconfig';
  walkyServiceTypeKey = 'walky'; // this should be same what is set in server config file
  avStreamerServiceTypeKey = 'avstreamer'; // this should be same what is set in server config file
  ambientServiceTypeKey = 'ambient'; // this should be same what is set in server config file
  uiConfig: any = [];
  constructor() { }
}
