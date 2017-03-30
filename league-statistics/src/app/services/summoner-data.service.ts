import {Injectable}                from '@angular/core';
import { Http, Response }          from '@angular/http';

//import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Injectable()
export class SummonerDataService {
    private SERVER_ADRESS = 'http://localhost';
    private PORT = 8080;
    private LOCATION = '/api';
    private HOST = this.SERVER_ADRESS + ":" + this.PORT + this.LOCATION;

    constructor(private http: Http) {
    }

    getSummonersList() {
        return this.http
            .get(this.HOST + '/getSummoners')
            .map((res: Response) => res.json());
    }

    updateSummonerMatchData(summonerId) {
        return this.http
            .get(this.HOST + '/updateSummonerMatchData?userId=' + summonerId)
            .map((res: Response) => res.json());
    }

    updateSummonerProfileData(summonerId) {
        return this.http
            .get(this.HOST + '/updateSummonerData?userId=' + summonerId)
            .map((res: Response) => res.json());
    }

}
