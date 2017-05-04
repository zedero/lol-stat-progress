import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'
import {SummonerDataService} from '../../services/summoner-data.service'

import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-summoner-graphs',
    templateUrl: './summoner-graphs.component.html',
    styleUrls: ['./summoner-graphs.component.css']
})
export class SummonerGraphsComponent implements OnInit {
    summonerMatchData: Array<any> = [];
    champions: Array<any> = [];
    filterRole: string = "ALL";
    nrOfMatchesAverage: number = 20;
    nrOfLatestMatches: number = 250;

    summonerId = 65002229;

    filterRoles: Array<string> = [
        "ALL",
        "TOP",
        "JUNGLE",
        "MID",
        "CARRY",
        "SUPPORT"
    ];

    public line_ChartOptions = {
        titleTextStyle: {color: '#FFF'},
        backgroundColor: '#263646',
        colors: ['#01689b', '#6bdb8d'],
        hAxis: {
            textStyle: {
                color: '#FFF'
            }
        },
        vAxis: {
            textStyle: {
                color: '#FFF'
            }
        },
        title: 'placeholder text',
        legend: {
            position: 'none',
            textStyle: {
                color: '#FFF'
            }
        }
    };
    public lineHtml_ChartOptions = {
        titleTextStyle: {color: '#FFF'},
        backgroundColor: '#263646',
        colors: ['#6bdb8d', '#6bdb8d'],
        hAxis: {
            textStyle: {
                color: '#FFF'
            }
        },
        vAxis: {
            textStyle: {
                color: '#FFF'
            }
        },
        title: 'placeholder text',
        legend: {
            position: 'none',
            textStyle: {
                color: '#FFF'
            }
        },
        tooltip: {isHtml: true}
    };

    public gametime_ChartData = [];
    public gametime_ChartOptions = this.line_ChartOptions;
    public gametime_average = 0;

    public winrate_ChartData = [];
    public winrate_ChartOptions = this.lineHtml_ChartOptions;
    public winrate_average = 0;

    public wardsPerMin_ChartData = [];
    public wardsPerMin_ChartOptions = this.line_ChartOptions;
    public wardsPerMin_average = 0;

    public creepScore_ChartData = [];
    public creepScore_ChartOptions = this.line_ChartOptions;
    public creepScore_average = 0;

    public goldPerMin_ChartData = [];
    public goldPerMin_ChartOptions = this.line_ChartOptions;
    public goldPerMin_average = 0;

    public kda_ChartData = [];
    public kda_ChartOptions = this.line_ChartOptions;
    public kda_average = 0;

    public killPressence_ChartData = [];
    public killPressence_ChartOptions = this.line_ChartOptions;
    public killPressence_average = 0;

    public damageDealtToTurrets_ChartData = [];
    public damageDealtToTurrets_ChartOptions = this.line_ChartOptions;
    public damageDealtToTurrets_average = 0;

    constructor(private staticDataService: StaticDataService, private summonerDataService: SummonerDataService) {
    }

    ngOnInit() {
        this.getChampions();
        this.summonerDataService.summonerId$.subscribe(id => this.getSummonerData(id));
    }

    ngOnDestroy() {

    }


    getChampions() {
        this.staticDataService.getChampions()
            .subscribe(data => {
                if (data.length > 0) {
                    let that = this;
                    data.forEach(function (champ) {
                        that.champions[champ.id] = champ;
                    });

                    //this.getSummonerData();
                }
            }, err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function () {
                    fthis.getChampions();
                }, 1000);
            });
    }

    getSummonerData(id=this.summonerId) {
        this.summonerDataService.getSummonerMatchData(id)
            .subscribe(data => {
                this.summonerMatchData = this.formatMatchesData(data);
                this.renderUI()
            }, err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function () {
                    fthis.getSummonerData();
                }, 1000);
            });
    }

    renderUI() {
        if((window as any).googleLoaded) {
            this.renderGameTimeChart();
            this.renderWinrateChart();
            this.renderWardsPerMinChart();
            this.renderCreepScoreChart();
            this.renderGoldPerMinChart();
            this.renderKDAChart();
            this.renderKillPressenceChart();
            this.damageDealtToTurretsChart();
        } else {
            setTimeout(this.renderUI ,100);
        }
    }

    renderGameTimeChart() {
        if(!this.summonerMatchData.length) return;
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];
        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                let gametime = Math.round(data.matchDuration / 60);
                average = ((average * index) + gametime) / (index + 1);
                if (index == 0) average = gametime;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(gametime);
                chartData.push([index, gametime, Math.round(this.getAverageFromArray(averageList))]);
            }
        });

        if(chartData.length == 0) {
            this.gametime_ChartData = [];
        } else {
            this.gametime_ChartOptions.title = "gametime";
            this.gametime_average = Math.round(average);
            this.gametime_ChartData = [['Match', 'Gametime', 'Average']].concat(chartData);
        }
    }

    renderWinrateChart() {
        /*TODO
        * fix calculations */
        let average: number = 0;
        let index: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach(data => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                average += parseInt(data.winner);
                index++;
            }
        });
        average = average / index;
        this.winrate_average = Math.round(average * 100);

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                let won = parseInt(data.winner);
                average = ((average * (index + this.nrOfMatchesAverage)) + won) / (index + this.nrOfMatchesAverage + 1);
                chartData.push([index, (Math.round(average * 10000) / 100), this.getTooltip(data.matchId, 'Winrate', (Math.round(average * 10000) / 100) + '%')]);
            }
        });

        if(chartData.length == 0) {
            this.winrate_ChartData = [];
        } else {
            this.winrate_ChartOptions.title = "Winrate";
            this.winrate_ChartData = [['Match', 'Winrate', {
                'type': 'string',
                'role': 'tooltip',
                'p': {'html': true}
            }]].concat(chartData);
        }
    }

    renderWardsPerMinChart() {
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                average = ((average * index) + data.wardsPerMin) / (index + 1);
                if (index == 0) average = data.wardsPerMin;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(data.wardsPerMin);

                chartData.push([index, data.wardsPerMin, this.getAverageFromArray(averageList)]);
            }
        });
        if(chartData.length == 0) {
            this.wardsPerMin_ChartData = [];
        } else {
            this.wardsPerMin_ChartOptions.title = "Wards per minute";
            this.wardsPerMin_average = Math.round(average * 100) / 100;
            this.wardsPerMin_ChartData = [['Match', 'Wards per minute', 'Average']].concat(chartData);
        }
    }

    renderCreepScoreChart() {
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                average = ((average * index) + data.csPerMin) / (index + 1);
                if (index == 0) average = data.csPerMin;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(data.csPerMin);

                chartData.push([index, data.csPerMin, this.getAverageFromArray(averageList)]);
            }
        });
        if(chartData.length == 0) {
            this.creepScore_ChartData = [];
        } else {
            this.creepScore_ChartOptions.title = "Creep score per minute";
            this.creepScore_average = Math.round(average * 100) / 100;
            this.creepScore_ChartData = [['Match', 'Creep score per minute', 'Average']].concat(chartData);
        }
    }

    renderGoldPerMinChart() {
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                average = ((average * index) + data.goldPerMin) / (index + 1);
                if (index == 0) average = data.goldPerMin;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(data.goldPerMin);

                chartData.push([index, data.goldPerMin, this.getAverageFromArray(averageList)]);
            }
        });
        if(chartData.length == 0) {
            this.goldPerMin_ChartData = [];
        } else {
            this.goldPerMin_ChartOptions.title = "Gold score per minute";
            this.goldPerMin_average = Math.round(average * 100) / 100;
            this.goldPerMin_ChartData = [['Match', 'Gold score per minute', 'Average']].concat(chartData);
        }
    }

    renderKDAChart() {
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                let KDA = 0;

                if (data.deaths == 0) {
                    KDA = data.kills + data.assists;
                } else {
                    KDA = (data.kills + data.assists) / data.deaths;
                }

                average = ((average * index) + KDA) / (index + 1);
                if (index == 0) average = KDA;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(KDA);

                chartData.push([index, KDA, this.getAverageFromArray(averageList)]);
            }
        });
        if(chartData.length == 0) {
            this.kda_ChartData = [];
        } else {
            this.kda_ChartOptions.title = "KDA";
            this.kda_average = Math.round(average * 100) / 100;
            this.kda_ChartData = [['Match', 'KDA', 'Average']].concat(chartData);
        }
    }

    renderKillPressenceChart() {//killPressence
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if (data.role == this.filterRole || this.filterRole == "ALL") {
                let pressence = (data.kills + data.assists) / (data.teamKills);
                pressence *= 100;
                if (data.kills == 0 && data.assists == 0) {
                    pressence = 0;
                    if (data.teamKills == 0) pressence = average;
                }
                if (pressence > 100) {
                    console.log(data.matchId)
                }

                average = ((average * index) + pressence) / (index + 1);
                if (index == 0) average = pressence;

                if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                averageList.push(pressence);

                chartData.push([index, pressence, this.getAverageFromArray(averageList)]);
            }
        });
        if(chartData.length == 0) {
            this.killPressence_ChartData = [];
        } else {
            this.killPressence_ChartOptions.title = "Kill pressence";
            this.killPressence_average = Math.round(average * 100) / 100;
            this.killPressence_ChartData = [['Match', 'Kill pressence', 'Average']].concat(chartData);
        }
    }


    damageDealtToTurretsChart() {
        let average: number = 0;
        let averageList: Array<any> = [];
        let chartData: Array<any> = [];

        this.summonerMatchData.forEach((data, index) => {
            if(data.matchCreation > 1492891516800) {
                if (data.role == this.filterRole || this.filterRole == "ALL") {
                    average = ((average * index) + data.damageDealtToTurrets) / (index + 1);
                    if (index == 0) average = data.damageDealtToTurrets;

                    if (averageList.length >= this.nrOfMatchesAverage) averageList.shift();
                    averageList.push(data.damageDealtToTurrets);

                    chartData.push([index, data.damageDealtToTurrets, this.getAverageFromArray(averageList)]);
                }
            }
        });

        if(chartData.length == 0) {
            this.damageDealtToTurrets_ChartData = [];
        } else {
            this.damageDealtToTurrets_ChartOptions.title = "Damage to turrets";
            this.damageDealtToTurrets_average = Math.round(average);
            this.damageDealtToTurrets_ChartData = [['Match', 'Damage dealt to turrets', 'Average']].concat(chartData);
        }
    }

    formatMatchesData(arr: Array<any>) {
        let matches = [];
        let that = this;
        arr = this.limitArrayLength(arr);
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
            match.champion = that.champions[data.champion];
            //------
            matches.push(match);
        });

        return matches;
    }

    getRole(lane: string, role: string) {
        if (lane == "JUNGLE") {
            return "JUNGLE";
        } else if (lane == "MID") {
            return "MID";
        } else if (lane == "TOP") {
            return "TOP";
        } else if (role == "DUO_SUPPORT") {
            return "SUPPORT";
        } else {
            return "CARRY";
        }
    }

    getTooltip(matchId, type, value) {
        return ` <div class="tooltip">
                    <div><b>${matchId}</b></div>
                    <div>${type}: ${value}</div>
                 </div>`
    }

    getAverageFromArray(arr: Array<number>) {
        let total = 0;
        arr.forEach(data => {
            total = total + data;
        });
        return total / arr.length;
    }

    limitArrayLength(arr: Array<any>) {
        return arr.slice(Math.max(arr.length - this.nrOfLatestMatches, 1))
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }

}
