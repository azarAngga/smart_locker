import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { BlPage } from '../pages/bl/bl';
import { SmV2Page } from '../pages/sm-v2/sm-v2';
import { ListGeneratePage } from '../pages/list-generate/list-generate';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';



import { UriProvider } from '../providers/uri/uri';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
//import { WebServiceProvider } from '../providers/web-service/web-service';
import { WebSocketProvider } from '../providers/web-socket/web-socket';
const config: SocketIoConfig = { url: 'http://192.168.43.7:3000', options: {} };


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListGeneratePage,
    ListPage,
    SmV2Page,
    BlPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SmV2Page,
    ListGeneratePage,
    HomePage,
    LoginPage,
    BlPage,
    ListPage  
  ],
  providers: [
    UriProvider,
    Clipboard,
    Toast,
    StatusBar,
    BarcodeScanner,
    BluetoothSerial,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //WebServiceProvider,
    WebSocketProvider
  ]
})
export class AppModule {}
