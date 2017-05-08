import {Injectable}                from '@angular/core';
import { Http, Response }          from '@angular/http';

//import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
//import 'rxjs/add/operator/catch';

@Injectable()
export class SummonerDataService {
    private SERVER_ADRESS = 'http://0.0.0.0';//'http://85.214.156.29';
    private PORT = 13370;
    private LOCATION = '/api';
    private HOST = this.SERVER_ADRESS + ":" + this.PORT + this.LOCATION;

    summonerId$: Subject<number>;

    constructor(private http: Http) {
        this.summonerId$ = new ReplaySubject(1);
    }

    getSummonersList() {
        return this.http
            .get(this.HOST + '/getSummoners')
            .map((res: Response) => res.json());
    }

    updateSummonerMatchData(summonerId) {
        // ID = accountId
        return this.http
            .get(this.HOST + '/updateSummonerMatchData?userId=' + summonerId)
            .map((res: Response) => res.json());
    }

    updateSummonerProfileData(summonerId) {
        // ID = summonerId
        return this.http
            .get(this.HOST + '/updateSummonerData?userId=' + summonerId)
            .map((res: Response) => res.json());
    }

    getSummonerMatchData(summonerId) {
        // ID = accountId
        return this.http
            .get(this.HOST + '/getSummonerMatchData?userId=' + summonerId)
            .map((res: Response) => res.json());
    }
}

