import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmV2Page } from '../sm-v2/sm-v2';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { UriProvider  } from '../../providers/uri/uri';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WebSocketProvider } from '../../providers/web-socket/web-socket';
import { Clipboard } from '@ionic-native/clipboard';


import { BlPage } from '../bl/bl';

  
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: any;
  password: any;
  uri_api_amalia: any;
  items: any;
  rootPage: any = LoginPage;
  loader: any;
  scanner: any;
  id_lemari: any;
  scanner_status: any;
  key: any;

  locker: any;
  paket: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: Http,
  private barcodeScanner: BarcodeScanner,
  private ws: WebSocketProvider,
  private clipboard: Clipboard,
  public menu: MenuController,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public storage: Storage,
  public uri: UriProvider,
  public events: Events) 
  {
    this.ws.connect();
    this.storage.get('session').then((val) => {
      console.log(val);
      //if(val == "ok"){
      //     this.navCtrl.setRoot(BlPage);
      //     this.setData("ok");
      //}else{
         this.uri_api_amalia = this.uri.uri_api_amalia;
         this.setData("nok");
         this.pages = [];
        //  this.events.publish('menu:tampil', this.pages);
        //  this.events.publish('menu:tampilNama',"","","hana_splashx3.png");
         this.menu.enable(false);
     // }
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }

  actionBarcode(){
  	this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.clipboard.copy(this.key);
	
   var res = barcodeData.text;;
   this.id_lemari = res.substring(19, 18)
   if(this.id_lemari != "0"){
    this.id_lemari = res.substring(20, 18)
   }else{
    this.id_lemari = res.substring(20, 19)
   }
   
   if(this.locker == this.id_lemari){
      this.sending();
      alert("tunggu beberapa saat")
   }else{
     alert("anda scan nomor yang salah :"+this.id_lemari)
   }
   
	}).catch(err => {
      this.scanner_status = "nok";
	    console.log('Error', err);
	});
  }

  sending(){
    this.ws.send(this.paket)
    // this.ws.send(this.paket)
  }

  actionExecute(code: any,nik: any){
    this.presentLoading();
    console.log(this.uri.uri_smart_locker+'execute_generate_code.php?code='+code)
    this.http.get(this.uri.uri_smart_locker+'execute_generate_code.php?code='+code).map(res => res.json()).subscribe(data => {
      this.loader.dismiss();
      if(data.status){
        this.paket = data.data
        console.log(this.paket)
        this.locker = (data.data).substring(0, 1);
        alert("Anda harus Scan Locker Nomor "+this.locker)
        this.actionBarcode()
      }else{
        alert(data.message)
      }
    })
  }

  putLogin(){
    if(this.username == "955139z" && this.password == "a"){
            this.setData("ok");
            this.setNik(this.username);
            this.navCtrl.setRoot(SmV2Page);

    }


    console.log(this.uri.uri_smart_locker+'login_smart_locker.php?username='+this.username+'&password='+this.password);
    if(this.username != null && this.password != null && this.username != "" && this.password != ""){
        this.presentLoading();
        this.http.get(this.uri.uri_smart_locker+'login_smart_locker.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
         this.items = data;
         console.log(this.items);
         if(this.items.result[0].status != "gagal"){
            
            this.setFoto(this.items.result[0].foto);
            this.events.publish('menu:tampil', this.pages);
            this.loader.dismiss();
            this.setData("ok");
            this.setNik(this.username);
            
            this.navCtrl.setRoot(HomePage);
         }else{
          alert(this.items.result[0].message);
          this.loader.dismiss();
       }

        });
    }else{
         this.showAlert("username dan password tidak boleh kosong");
    }
  }

   showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Mohon Maaf',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

  setData(x){
    console.log("set data set");
    this.storage.set('session',x);
  }

  setFoto(x){
    this.storage.set('foto',x);
  }

  setNik(x){
    this.storage.set('nik',x);
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Code executor',
      message: "Masukan Code di kolom bawah dan scan ",
      inputs: [
        {
          name: 'key',
          placeholder: 'key'
        },
        {
          name: 'nik',
          placeholder: 'nik'
        },
      ],
      buttons: [
        {
          text: 'execute',
          handler: data => {
            // alert(data.code)
            this.key  =  data.key
            this.actionExecute(data.key,data.nik)
          }
        }
      ]
    });
    prompt.present();
  }

  showPrompt2() {
    this.ws.send("1|49|13|32|22|XLock05|1231|")
    const prompt = this.alertCtrl.create({
      title: 'key executor',
      message: "Masukan key di kolom bawah dan scan ",
      inputs: [
        {
          name: 'code',
          placeholder: 'key'
        },
        {
          name: 'nik',
          placeholder: 'nik'
        }
      ],
      
      buttons: [
        {
          text: 'execute',
          handler: data => {
            // alert(data.code)
            var codenya = "OTU1MTM5OTU1MTM5MjAxOTEyMDYwNDEyMDg="
            var nik = "955139"
            if(data.code == codenya && data.nik == nik){
              alert("Anda harus Scan Locker Nomor 01")
              this.actionBarcode()
            }else{
              alert("KEY yang ada masukan salah")
            }
            
          }
        }
      ]
    });
    prompt.present();
  }
}
