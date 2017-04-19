import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage implements OnInit {
  shop: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {}
  
  ngOnInit() {
    this.shop = this.navParams.get('shop');
    console.log(this.shop);
  }

}
