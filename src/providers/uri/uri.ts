import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UriProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UriProvider {
 
   ip: any = 'http://api.telkomakses.co.id/';
  // ip: any = 'http://10.204.200.8/';

  uri_api_alista: any = this.ip+'API/alista/';
  uri_app_amalia: any = this.ip+'API/amalia/';
  uri_api_wimata: any = this.ip+'API/wimata/';
  uri_api_amalia: any = this.ip+'API/amalia/';
  constructor(public http: Http) {
    console.log('Hello UriProvider Provider');
  }

  uri_smart_locker: any = this.ip+"API/locker/";

}
