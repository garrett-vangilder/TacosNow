import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationInfo: Geoposition;
  locationIsSet: boolean = false;
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private toastController: ToastController) {
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
          console.log(this.locationInfo);
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

}
