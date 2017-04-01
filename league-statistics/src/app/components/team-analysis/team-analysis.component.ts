import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'
import {AnalyzeTeamcompService} from '../../factories/analyze-teamcomp.service'

@Component({
    selector: 'app-team-analysis',
    templateUrl: './team-analysis.component.html',
    styleUrls: ['./team-analysis.component.css']
})
export class TeamAnalysisComponent implements OnInit {
    champions;

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



    teamdata = [{
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
    }];

    constructor(private staticDataService: StaticDataService, private analyzeTeamcompService: AnalyzeTeamcompService) {
    }

    ngOnInit() {
        /*this.lanes[0].champ = 82;
        this.lanes[1].champ = 82;
        this.lanes[2].champ = 82;
        this.lanes[3].champ = 82;
        this.lanes[4].champ = 82;*/

        this.getChampions();
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
                        this.setChampionInTeam(lane.champ,index);
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

    analyseTeamcomp() {
        if(this.teamdata.every(data => data.selectedChamp > 0)) {
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

            this.analyzeTeamcompService.judgementOnData(this.teamdata);
        }else{
            this.analyzeTeamcompService.judgementOnData(this.teamdata);
        }
    }

    setChampionInTeam(id,lane) {
        this.teamdata[lane].selectedChamp = id;
        this.teamdata[lane].data = this.champions.find(data => data.id == id);

    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
//(change)="selectSummoner($event)"
