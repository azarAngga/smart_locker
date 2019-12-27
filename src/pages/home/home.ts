import { Component } from '@angular/core';
import { NavController,Platform ,MenuController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { WebSocketProvider } from '../../providers/web-socket/web-socket';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	id_lemari: any;
  unpairedDevices: any;
  pairedDevices: any;
  loader: any;
  pin: any;
  rftag: any;
  gettingDevices: Boolean;
  scanner: any= "Scan QRCODE";
  lable_locker: any;
  lable_tempat: any;
  nik: any ;
  scanner_status: any="nok" ;
  paket: any = "";
  must_locker: any = "";
  message_error_lemari: any = "";

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public loadingCtrl: LoadingController,
    public http: Http,
    public menu: MenuController,
    public storage: Storage,
    private bluetoothSerial: BluetoothSerial,
    public platform: Platform,
    private socket: Socket,
    private ws: WebSocketProvider,
    public uri: UriProvider,
    private alertCtrl: AlertController) {
    this.ws.connect();
    this.storage.get('nik').then((val) => {
      this.nik = val;
      this.getLocker();
    });
  } 
 
  actionBarcode(){
  	this.barcodeScanner.scan().then(barcodeData => {
	 console.log('Barcode data', barcodeData);
	 
   var res = barcodeData.text;;
   this.scanner = "Terscan Locker "+res.substring(18, 20);
   this.id_lemari = res.substring(18, 20);
   this.pushLocker();
	}).catch(err => {
      this.scanner_status = "nok";
	    console.log('Error', err);
	});
  }


  getLocker(){
        this.presentLoading();
        console.log(this.uri.uri_smart_locker+"locker.php?nik="+this.nik);
        this.http.get(this.uri.uri_smart_locker+"locker.php?nik="+this.nik)
        .map(res => res.json())
        .subscribe(data => {
           this.lable_tempat = data.wh;
           this.lable_locker = data.locker;
           this.paket = data.paket;
           this.message_error_lemari = data.error_message;
           this.must_locker = (data.locker).replace("Locker"," ").trim();
           console.log(data);
           this.loader.dismiss();
        });
  }

  pushLocker(){
    if(this.id_lemari == this.must_locker ){
      this.presentLoading();
      this.sending()
      setTimeout(() => {
        this.loader.dismiss();
       }, 3000)
       
     }else{
      alert(this.message_error_lemari+this.must_locker); 
     }
  } 

  getFromServer(){
    //alert("http://10.204.200.8/API/locker/push_action.php?nik="+this.nik+"&locker="+this.id_lemari);
        // console.log(this.uri.uri_smart_locker+"push_action.php?nik="+this.nik+"&locker="+this.id_lemari);
        this.http.get(this.uri.uri_smart_locker+"push_action.php?nik="+this.nik+"&locker="+this.id_lemari)
        .map(res => res.json())
        .subscribe(data => {
          if(data.status == "T"){
            this.scanner_status = "ok";
          }else if(data.status == "S"){
            this.scanner_status = "ok";
            alert(data.message);
          }else{
            this.scanner_status = "nok";
            alert(data.message);
          }
           //this.loader.dismiss();
        });
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  presentLoadPintu(){
    const loader = this.loadingCtrl.create({
      content: "Mohon tunggu pintu akan terbuka beberapa saat lagi...",
      duration: 10000
    });
    loader.present();
  }

  sending(){
    this.ws.send(this.paket)
  }



}
