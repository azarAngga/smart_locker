import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';



/**
 * Generated class for the ListGeneratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-list-generate',
  templateUrl: 'list-generate.html',
})
export class ListGeneratePage {

  data_list_generate: any;
  nik_request: any;
  loader: any;
  nik: any 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public uri: UriProvider,
    private toast: Toast,
    public storage: Storage,
    private clipboard: Clipboard,
    public loadingCtrl: LoadingController
    
    ) {
      this.storage.get('nik').then((val) => {
        if(val != null){
          this.nik = val;
          this.getGenerate()
        }
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListGeneratePage');
    // this.nik = "955139"
    
  }

  generateCode(){
    if(this.nik_request == "" || this.nik_request == undefined){
      alert("Nik Request tidak boleh kosong")
      return true
    }
    this.presentLoading();
    console.log(this.uri.ip+"/API/locker/generate_code.php?nik_owner="+this.nik+"&nik_requester="+this.nik_request)
    this.http.get(this.uri.ip+"/API/locker/generate_code.php?nik_owner="+this.nik+"&nik_requester="+this.nik_request)
    .map(res => res.json())
    .subscribe(data =>{
      this.loader.dismiss();
      if(data.status){
        // this.navCtrl.setRoot();
        this.getGenerate()
      }else{
        alert(data.message)
      }  
    });
  }

  getGenerate(){
    this.presentLoading();
    console.log(this.uri.ip+"/API/locker/get_generate_code.php?nik="+this.nik)
    this.http.get(this.uri.ip+"/API/locker/get_generate_code.php?nik="+this.nik)
    .map(res => res.json())
    .subscribe(data =>{
      this.data_list_generate = [];
      // var datas = JSON.stringify(data.data)
      this.data_list_generate = data.data;
      // console.log(datas)
      this.loader.dismiss()
    });
  }

  restoreClipboard(){
    this.clipboard.paste().then(
      (resolve: string) => {
         alert(resolve);
       },
       (reject: string) => {
         alert('Error: ' + reject);
       }
     );
  }


  copyClipboard(code: any){
    this.clipboard.clear();
    this.clipboard.copy(code);
    this.toast.show("Code: "+code+ " berhasil tercopy", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


  getList(){
    this.data_list_generate = [];
    this.getGenerate()
  }
  clearClipboard(){
    this.clipboard.clear();

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

}
