import { Component, OnInit } from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'

@Component({
  selector: 'app-tank-itemizer',
  templateUrl: './tank-itemizer.component.html',
  styleUrls: ['./tank-itemizer.component.css']
})
export class TankItemizerComponent implements OnInit {
    champions;
    items;
    champIdForEffectiveHealth = 0;

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit() {
      this.getChampions();
      this.getItems();
  }

    getChampions() {
        this.staticDataService.getChampions()
            .subscribe(data => {
                if(data.length > 0) {
                    let first = data.shift();
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    data.unshift(first);
                    this.champions = data;
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


    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
