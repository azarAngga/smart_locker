
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  nik: any;
  loader: any;
  data: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController,
   public http: Http,
   public storage: Storage,
   public uri: UriProvider,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
   public navParams: NavParams) {

      this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#488aff');

      // If we navigated to this page, we will have an item available as a nav param
      this.selectedItem = navParams.get('item');
      this.storage.get('nik').then((val) => {
      this.nik = val;
      this.getLog();
    });
  }

    getLog(){
        this.presentLoading();
        
        this.http.get(this.uri.uri_smart_locker+"get_log_locker.php?nik="+this.nik)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
           console.log(data);
           this.loader.dismiss();
        });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }
}
