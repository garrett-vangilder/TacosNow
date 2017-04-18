import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ShopsService } from '../../services/shops';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationInfo: Geoposition;
  locationIsSet: boolean = false;
  shops: any;
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private toastController: ToastController,
              private shopService: ShopsService) {
  }

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
          console.log(error);
          const toast = this.toastController.create({
            message: 'Could not get location, please search manually',
            duration: 2500
          })
          toast.present();
        }
      );
  }

  private getShops(location) {
    console.log('getting shops');
    this.shopService.loadShops(location)
      .then((data) => console.log(data))
  }

}
