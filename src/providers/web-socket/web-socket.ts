import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the WebSocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSocketProvider {

  private ws;
  private onmessage;

  constructor() {
    console.log('Hello WebSocketProvider Provider');
  }

  retry(evt) {
    setTimeout(() => {
      this.connect();
    }, 3000);
    console.log(`Error: ${evt}`);
  }

  connect() {
    this.ws = new WebSocket('ws://203.130.242.238:3005');

    this.ws.onmessage = this.onmessage;
    this.ws.onopen    = (evt) => console.log("** Opened ***");
    
    this.ws.onclose   = this.retry.bind(this);
    // this.ws.onerror   = this.retry.bind(this);
  }
  send(message: any) {
    this.ws.send(message);
  }

}
