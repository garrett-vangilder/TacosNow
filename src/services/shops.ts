import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { APIKeys } from '../app/keys';
import 'rxjs/Rx';

declare var google; 

@Injectable()
export class ShopsService {
    public shops: any[] = [];
    constructor(private http: Http, public keys: APIKeys) {
    };

    loadShops(location: any) {
        const latitude = location.coords.latitude.toFixed(2);
        const longitude = location.coords.longitude.toFixed(2);
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&keyword=mexican&&key=${this.keys.googlePlaces}`)
            .then(data => data.json())
            .then(json => {
                let obj = Object(json)
                obj.results.map((shop) => {
                    this.shops.push(shop)
                })
                return this.shops;
            })
    }
}