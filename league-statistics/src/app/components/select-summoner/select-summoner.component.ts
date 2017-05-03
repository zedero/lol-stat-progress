import {Component, OnInit} from '@angular/core';
import {SummonerDataService} from "../../services/summoner-data.service";

import { SummonersData } from '../../summoners-data';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'select-summoner',
    templateUrl: './select-summoner.component.html',
    styleUrls: ['./select-summoner.component.css']
})
export class SelectSummonerComponent implements OnInit {
    summoners;
    selectedSummoner = {
        "id": -1,
        "name": "",
        "summonerLevel": 0,
        "revisionDate": 0,
        "profileIconId": 0,
        "accountId": 0
    };
    test;
    updating = false;
    apiError = false;

    constructor(private summonerDataService: SummonerDataService) {
    }

    ngOnInit() {
        this.getSummoners();
    }

    getSummoners() {
        //this.summoners = this.summonerDataService.getSummonersList();
        this.summonerDataService.getSummonersList()
            .subscribe(data => {
                if(this.summoners == undefined && data.length != 0) {
                    this.selectedSummoner = data[0];
                    this.summonerDataService.summonerId$.next(data[0].id);
                }
                if(data.length > 0) {
                    this.summoners = data;
                }
            },err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function(){
                    fthis.getSummoners();
                }, 1000);
            });
    }

    updateSummoner() {
        this.apiError = false;

        if (!this.updating) {
            this.updating = true;
            this.summonerDataService.updateSummonerProfileData(this.selectedSummoner.id)
                .subscribe(
                    data => {
                        if(!data.startedUpdate) {
                            if(data.length > 0) {
                                this.summoners = data;
                                this.selectSummoner({target: {value: this.selectedSummoner.id}});
                            }
                        }
                    },
                    err => {
                        this.handleError(err);
                    });
            this.summonerDataService.updateSummonerMatchData(this.selectedSummoner.accountId)
                .subscribe(
                    data => {
                        this.updating = false;
                        if(!data.startedUpdate) {
                            console.log(data);
                        }
                    },
                    err => {
                        this.handleError(err);
                    });
        }
    }

    selectSummoner(event) {
        let id = event.target.value;
        this.summonerDataService.summonerId$.next(id);

        this.summonerDataService.getSummonersList()
            .subscribe(data => {
                this.selectedSummoner = data.find(function ( obj ) {
                    return obj.id == id;
                });
            });
    }

    private handleError(error: any) {
        this.updating = false;
        this.apiError = true;
        console.error('An error occurred', error);
    }

}
