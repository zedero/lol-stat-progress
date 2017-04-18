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
    items;
    champIdForEffectiveHealth = 412;

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
        this.getItems();
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
                        this.setChampionInTeam(0,index);
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

    getItems() {
        this.staticDataService.getItems()
            .subscribe(data => {
                if(data.length > 0) {
                    this.items = data;

                }
            },err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function(){
                    fthis.getItems();
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

    /**/
    calculateEffectiveHealth( ) {
        let level = 8; //(0-17) = level 1-18
        let champStats = JSON.parse(this.champions.find(data => data.id == this.champIdForEffectiveHealth).stats);
        let base_armor   = Math.round(champStats.armor + (champStats.armorperlevel * level)),
            base_mr      = Math.round(champStats.spellblock + (champStats.spellblockperlevel * level)),
            base_hp      = Math.round(champStats.hp + (champStats.hpperlevel * level)),
            effeciveHpArmor = Math.round((base_hp * ((100 + base_armor) / 100))),
            effeciveMrArmor = Math.round((base_hp * ((100 + base_mr) / 100)));

        console.log(  "hp/mr/armor: ",base_hp,base_mr,base_armor  );
        console.log("Effective health (magic): ",effeciveMrArmor);
        console.log("Effective health (armor): ",effeciveHpArmor);
        let arr = this.getEffectiveHealtItemList(base_hp,base_mr,base_armor,this.items,.58);
        let maxShown = 12;
        console.log('-------------- Armor:');
        arr = arr.sort(function(b,a) {return a.effHpArmor - b.effHpArmor});
        arr.slice(0,maxShown).forEach((data) => {
            console.log(data.name,data.effHpArmor,"("+data.gold+"g)");
        });
        console.log('-------------- Magic:');
        arr = arr.sort(function(b,a) {return a.effHpMagic - b.effHpMagic});
        arr.slice(0,maxShown).forEach((data) => {
            console.log(data.name,data.effHpMagic,"("+data.gold+"g)");
        });
        console.log('-------------- Mixed:');
        arr = arr.sort(function(b,a) {return a.effHpMixed - b.effHpMixed});
        arr.slice(0,maxShown).forEach((data) => {
            console.log(data.name,data.effHpMixed,"("+data.gold+"g)");
        });
    }

    getEffectiveHealtItemList(health,magicresists,armor,items,adRatio) {
        let arr = [];
        items.forEach((data) => {
            let hp,mr,ar,effHpArmor,effHpMagic;
                hp = health + data.health;
                mr = magicresists + data.magicresistance;
                ar = armor + data.armor;
                effHpArmor = Math.round((hp * ((100 + ar) / 100))) - Math.round((health * ((100 + armor) / 100)));
                effHpMagic = Math.round((hp * ((100 + mr) / 100))) - Math.round((health * ((100 + magicresists) / 100)));

                let item = {
                    id : data.id,
                    name : data.name,
                    gold : data.gold,
                    effHpArmor : effHpArmor,
                    effHpMagic : effHpMagic,
                    effHpMixed : (effHpArmor * adRatio) + (effHpMagic * (1-adRatio))
                };
                arr.push(item);

        });

        return arr;
    }

    /**/
    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
//(change)="selectSummoner($event)"
