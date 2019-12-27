import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { WebSocketProvider } from '../../providers/web-socket/web-socket';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the SmV2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sm-v2',
  templateUrl: 'sm-v2.html',
})
export class SmV2Page {

  constructor(public navCtrl: NavController,
        private barcodeScanner: BarcodeScanner,
   public navParams: NavParams,private socket: Socket,
   private ws: WebSocketProvider
   ) {
    this.ws.connect();
    //this.ws.send("hallo");
  }

  sending2(){
    //this.ws.send("1|12|10|9|5|xLock03|955139|")
    this.ws.send("2|47|12|30|24|XLock05|955139|")

  }

  sending1(){
    this.ws.send("1|49|13|32|22|XLock05|955139|")
    //this.ws.send("2|13|11|7|6|xLock03|955139|")

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SmV2Page');
  }

  sendMessage() {
    this.socket.emit('add-message', "hello");
  }

  actionBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
   
   var res = barcodeData.text;;
   this.sending1();
   //alert(res)
   //this.scanner = "Terscan Locker "+res.substring(18, 20);
   ///this.id_lemari = res.substring(18, 20);
   alert("Yang terscan locker "+res.substring(18, 20));
  //  alert(res.substring(17,14 ));
   if(res.substring(18, 20) == "01"){
    this.sending1();
   }else{
    alert('woopss, anda sepertinya salah scan')
   }
  }).catch(err => {
      //this.scanner_status = "nok";
      console.log('Error', err);
  });
  }

}
