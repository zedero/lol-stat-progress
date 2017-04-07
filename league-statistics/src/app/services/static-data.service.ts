import {Injectable}                from '@angular/core';
import { Http, Response }          from '@angular/http';

//import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Injectable()
export class StaticDataService {
    private SERVER_ADRESS = 'http://localhost';
    private PORT = 8080;
    private LOCATION = '/api';
    private HOST = this.SERVER_ADRESS + ":" + this.PORT + this.LOCATION;

    constructor(private http: Http) {
    }

    getChampions() {
        return this.http
            .get(this.HOST + '/getChampions')
            .map((res: Response) => res.json());
    }

    getItems() {
        return this.http
            .get(this.HOST + '/getItems')
            .map((res: Response) => res.json());
    }

}

