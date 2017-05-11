import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'
import {AnalyzeTeamcompService} from '../../factories/analyze-teamcomp.service'
import {SummonerDataService} from "../../services/summoner-data.service";

@Component({
    selector: 'app-team-analysis',
    templateUrl: './team-analysis.component.html',
    styleUrls: ['./team-analysis.component.css']
})
export class TeamAnalysisComponent implements OnInit {
    champions;
    summoners;
    selectedSummoner;
    isSummonerIngame = true;

    analysisBlue = {
        damage : '',
        defence : '',
        crowdControl : '',
        healing : '',
        shields : '',
    };

    analysisRed = {
        damage : '',
        defence : '',
        crowdControl : '',
        healing : '',
        shields : '',
    };

    lanes = [{
        lane:"top",
        champ: 50, //Swain
        data : []
    }, {
        lane:"jungle",
        champ: 427, //"Ivern"
        data : []
    }, {
        lane:"mid",
        champ:268,//"Azir"
        data : []
    }, {
        lane:"adc",
        champ:222,//"Jinx"
        data : []
    }, {
        lane:"support",
        champ:143,//"Zyra"
        data : []
    }];



    teamdata = [[{
        lane:"top",
        selectedChamp: 0,
        data : []
    }, {
        lane:"jungle",
        selectedChamp: 0,
        data : []
    }, {
        lane:"mid",
        selectedChamp: 0,
        data : []
    }, {
        lane:"adc",
        selectedChamp: 0,
        data : []
    }, {
        lane:"support",
        selectedChamp: 0,
        data : []
    }],[{
        lane:"top",
        selectedChamp: 0,
        data : []
    }, {
        lane:"jungle",
        selectedChamp: 0,
        data : []
    }, {
        lane:"mid",
        selectedChamp: 0,
        data : []
    }, {
        lane:"adc",
        selectedChamp: 0,
        data : []
    }, {
        lane:"support",
        selectedChamp: 0,
        data : []
    }]];

    constructor(private staticDataService: StaticDataService, private analyzeTeamcompService: AnalyzeTeamcompService, private summonerDataService: SummonerDataService) {
    }

    ngOnInit() {
        this.getChampions();
        this.getSummoners();
    }

    getChampions() {
        this.staticDataService.getChampions()
            .subscribe(data => {
                if(data.length > 0) {

                    let first = data.shift();
                    this.analyzeTeamcompService.setStaticData(data);
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    data.unshift(first);
                    this.champions = data;

                    // SET DEFAULT CHAMPS FOR TESTING
                    this.lanes.forEach((lane,index) => {
                        //this.setChampionInTeam(lane.champ,index);
                        this.setChampionInTeam(0,index,0);
                        this.setChampionInTeam(0,index,1);
                    })

                }
            },err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function(){
                    fthis.getChampions();
                }, 1000);
            });
    }

    getSummoners() {
        this.summonerDataService.getSummonersList()
            .subscribe(data => {
                if(this.summoners == undefined && data.length != 0) {
                    this.selectedSummoner = data[0];
                    this.summonerDataService.summonerId$.next(data[0].accountId);
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

    analyseTeamcomp() {
        //if(this.teamdata.every(data => data.selectedChamp > 0)) {
            /*let ad = this.analyzeTeamcompService.getAttackStrength(this.teamdata),
                md = this.analyzeTeamcompService.getMagicStrength(this.teamdata),
                defa = this.analyzeTeamcompService.getDefenceArmourStrength(this.teamdata),
                defm = this.analyzeTeamcompService.getDefenceMagicStrength(this.teamdata),
                cc = this.analyzeTeamcompService.getCrowdControlStrength(this.teamdata),
                heal = this.analyzeTeamcompService.getHealStrength(this.teamdata),
                shield = this.analyzeTeamcompService.getShieldStrength(this.teamdata);
            console.log("AD: ",ad);
            console.log("MD: ",md);
            console.log("DefA: ",defa);
            console.log("DefM: ",defm);
            console.log("CC: ",cc);
            console.log("Heal: ",heal);
            console.log("Shield: ",shield);*/

            //this.analysis = this.analyzeTeamcompService.judgementOnData(this.teamdata);
        //}else{
            this.analysisBlue = this.analyzeTeamcompService.judgementOnData(this.teamdata[0]);
            this.analysisRed  = this.analyzeTeamcompService.judgementOnData(this.teamdata[1]);
        //}
    }

    setChampionInTeam(id,lane,team = 0) {
        this.teamdata[team][lane].selectedChamp = id;
        this.teamdata[team][lane].data = this.champions.find(data => data.id == id);
    }

    getLiveData() {
        this.summonerDataService.getLiveSummonerGameData(this.selectedSummoner)
            .subscribe(data => {
                console.log(data);
                this.isSummonerIngame = true;
                let champions = [];
                data.participants.forEach(participant => {
                    champions.push({
                        summonerId: participant.summonerId,
                        champion: participant.championId,
                        participant: participant
                    });
                });
                this.setTeams(champions);
                console.log(champions);
            },err => {
                this.isSummonerIngame = false;
                this.handleError(err);
                /*let fthis = this;
                setTimeout(function(){
                    fthis.getLiveData();
                }, 1000);*/
            });
    }


    setTeams(champions) {
        this.setChampionInTeam(champions[0].champion,0,0);
        this.setChampionInTeam(champions[1].champion,1,0);
        this.setChampionInTeam(champions[2].champion,2,0);
        this.setChampionInTeam(champions[3].champion,3,0);
        this.setChampionInTeam(champions[4].champion,4,0);

        this.setChampionInTeam(champions[5].champion,0,1);
        this.setChampionInTeam(champions[6].champion,1,1);
        this.setChampionInTeam(champions[7].champion,2,1);
        this.setChampionInTeam(champions[8].champion,3,1);
        this.setChampionInTeam(champions[9].champion,4,1);
    }





    /**/
    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
