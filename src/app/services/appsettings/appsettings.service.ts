import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {
  baseAddress = environment.baseAddress;
  uiConfigUrl = 'http://' + this.baseAddress + '/app/uiconfig';
  walkyServiceTypeKey = 'walky'; // this should be same what is set in server config file
  avStreamerServiceTypeKey = 'avstreamer'; // this should be same what is set in server config file
  ambientServiceTypeKey = 'ambient'; // this should be same what is set in server config file
  uiConfig: any = [];
  constructor() { }
}
