import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { APIKeys } from './keys.ts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShopsService } from '../services/shops';
import { ShopDetailPage } from '../pages/shop-detail/shop-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShopDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: APIKeys.googleMaps
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShopDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ShopsService,
    APIKeys,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
