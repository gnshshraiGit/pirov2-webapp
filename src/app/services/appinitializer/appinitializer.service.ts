import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppsettingsService } from '../appsettings/appsettings.service';


@Injectable({
  providedIn: 'root'
})
export class AppinitializerService {

  constructor(private httpClient: HttpClient, private appSettings: AppsettingsService) { }

  getUIConfigs(): Promise<any> {
      return this.httpClient.get(this.appSettings.uiConfigUrl).toPromise().then((data) => {
        this.appSettings.uiConfig = data;
      }).catch((e) => {
        console.log(e);
      });
    }
}
