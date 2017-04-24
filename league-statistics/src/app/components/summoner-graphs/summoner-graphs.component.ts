import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'
import {SummonerDataService} from '../../services/summoner-data.service'

@Component({
    selector: 'app-summoner-graphs',
    templateUrl: './summoner-graphs.component.html',
    styleUrls: ['./summoner-graphs.component.css']
})
export class SummonerGraphsComponent implements OnInit {
    summonerMatchData = [];
    champions = [];


    constructor(private staticDataService: StaticDataService, private summonerDataService: SummonerDataService) {
    }

    ngOnInit() {
        this.getChampions();
    }

    getChampions() {
        this.staticDataService.getChampions()
            .subscribe(data => {
                if(data.length > 0) {
                    let that = this;
                    data.forEach(function(champ){
                        that.champions[champ.id] = champ;
                    });
                    console.log(this.champions);

                    this.getSummonerData();
                }
            },err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function(){
                    fthis.getChampions();
                }, 1000);
            });
    }

    getSummonerData() {
        this.summonerDataService.getSummonerMatchData(19887289)
            .subscribe(data => {
                this.summonerMatchData = this.formatMatchesData(data);
                console.log(this.summonerMatchData);
            },err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function(){
                    fthis.getSummonerData();
                }, 1000);
            });
    }

    renderUi() {
        /*
         *  Only render charts when google chart is available
         */

        //google.charts.setOnLoadCallback(function(){
            /*gametimeChart(_v);
            gamesWonChart(_v);
            wardsPerMinChart(_v);
            csChart(_v);
            goldChart(_v);
            kdaChart(_v);
            killPressenceChart(_v);
            timeline(_v);*/
            console.log('test');
        //});
    }

    formatMatchesData(arr) {
        let matches = [];
        let that = this;
        arr.forEach(function (data, index) {
            let match = data;
            let timeInMin = (data.matchDuration / 60);
            match.tlane = data.lane;
            match.trole = data.role;
            match.role = that.getRole(data.lane, data.role);
            match.goldPerMin = data.goldEarned / timeInMin;
            match.kda = (data.kills + data.assists) / data.deaths;
            match.wardsPerMin = data.wardsPlaced / timeInMin;
            match.cs = ( data.minionsKilled + data.neutralMinionsKilled );
            match.csPerMin = ( data.minionsKilled + data.neutralMinionsKilled ) / timeInMin;
            match.champion = that   .champions[data.champion];
            //------
            matches.push(match);
        });

        return matches;
    }

    getRole(lane,role) {
        if(lane == "JUNGLE") {
            return "JUNGLE";
        } else if(lane == "MID") {
            return "MID";
        } else if(lane == "TOP") {
            return "TOP";
        } else if(role == "DUO_SUPPORT") {
            return "SUPPORT";
        } else {
            return "CARRY";
        }
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }

}
