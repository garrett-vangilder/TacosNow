import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ShopsService } from '../../services/shops';
import { ShopDetailPage } from '../shop-detail/shop-detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationInfo: Geoposition;
  shops: any[] = [];
  locationIsSet: boolean = false;
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private toastController: ToastController,
              private shopService: ShopsService) {}

  ionViewWillEnter() {
    this.getLocation()
  }

  private getLocation() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    })
    loader.present();
       this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss()
          this.locationInfo = location;
          this.locationIsSet = true;
          this.getShops(this.locationInfo)
        }
      )
      .catch(
        error => {
          const toast = this.toastController.create({
            message: 'Could not get location, please search manually',
            duration: 2500
          })
          toast.present();
        }
      );
  }

  private getShops(location) {
    this.shopService.loadShops(location)
      .then((data) => {
        data.map((shop) => {
          let shopToAdd:any = {};
          shopToAdd.location = shop.geometry.location;
          shopToAdd.name = shop.name;
          shopToAdd.icon = shop.icon;
          this.shops.push(shopToAdd)
        })
      })
  }
  private openShopDetail(index: number) {
    const shop = this.shops[index];
    this.navCtrl.push(ShopDetailPage, { shop })
  }

}
