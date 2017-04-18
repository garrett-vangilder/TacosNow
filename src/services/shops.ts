import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { APIKeys } from '../app/keys';
import 'rxjs/Rx';

declare var google; 

@Injectable()
export class ShopsService {
    private shops: any[];
    constructor(private http: Http, public keys: APIKeys) {
    };

    loadShops(location: any) {
        console.log(location);
        const latitude = location.coords.latitude;
        console.log(latitude);
        const longitude = location.coords.longitude;
        console.log(longitude);
        return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.13,-86.83&radius=5000&type=restaurant&keyword=mexican&&key=${this.keys.googlePlaces}`)
            .then(data => data.json())
    }
}