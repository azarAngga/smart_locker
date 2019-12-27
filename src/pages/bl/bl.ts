import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform, MenuController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';


/**
 * Generated class for the BlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bl',
  templateUrl: 'bl.html',
})
export class BlPage {

  bl_name: any = [];
  bl_address: any = [];
  loader: any;
  fail: any;
  bl_sum: any = 0;


  constructor(public navCtrl: NavController,
    private bluetoothSerial: BluetoothSerial,
    private statusBar: StatusBar,
    public menu: MenuController,
    private alertCtrl: AlertController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
   public navParams: NavParams) {
    // let status bar overlay webview
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#488aff');
      this.menu.enable(true);

    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlPage');
  }

  test(){
    console.log("test");
  }

  startScanning() {
    this.presentLoading();
    this.reset();
    //this.pairedDevices = null;
    //this.unpairedDevices = null;
    //this.gettingDevices = true;
    this.platform.ready().then(() => {

      this.bluetoothSerial.discoverUnpaired().then((success) => {
      //this.unpairedDevices = success;
      //this.gettingDevices = false;
      console.log(success);
      this.bl_sum = success.length;
      this.loader.dismiss();
      success.forEach(element => {
        if(element.name != undefined){
          this.bl_name.push(element.name);
          this.bl_address.push(element.address);
        }
         //alert(element.name);
         //console.log("test");
      });
    },
      (err) => {
        console.log(err);
      })

    });
    

    // this.bluetoothSerial.list().then((success) => {
    // //  this.pairedDevices = success;
    // },
    //   (err) => {

    //   })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

  itemSelected(x){
    this.selectDevice(x);
    this.navCtrl.push(HomePage,{address:x});
  }

  reset(){
    this.bl_name = [];
    this.bl_address = [];
  }

  connect(x){
    this.platform.ready().then(() => {
          //this.startScanning();
          this.selectDevice(x);  
      });

  }

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe((data)=>{
              console.log("test");
              

            }, this.fail);
          }
        }
      ]
    });
    alert.present();

  } 

}
