import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SmV2Page } from '../pages/sm-v2/sm-v2';
import { BlPage } from '../pages/bl/bl';
import { ListGeneratePage } from '../pages/list-generate/list-generate';

import { Storage } from '@ionic/storage';
import { GeneratedFile } from '@angular/compiler';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 

  //rootPage: any = LoginPage;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
   public storage: Storage,
   public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.storage.get('session').then((val) => {
      if(val == "ok"){
           this.rootPage = HomePage;
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'History', component: ListPage },
            { title: 'Share Key', component:ListGeneratePage },
            { title: 'Logout', component:  LoginPage }
          ];
      }else{
          this.rootPage = LoginPage;
          this.pages = [];
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
