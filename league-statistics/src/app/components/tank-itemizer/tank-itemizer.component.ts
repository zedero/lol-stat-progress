import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'

@Component({
    selector: 'app-tank-itemizer',
    templateUrl: './tank-itemizer.component.html',
    styleUrls: ['./tank-itemizer.component.css']
})
export class TankItemizerComponent implements OnInit {
    champions;
    items;
    championLevel = 1;
    champIdForEffectiveHealth = 0;//412;

    baseHp = 0;
    baseArmour = 0;
    baseMagicResist = 0;
    currentHp = 0;
    currentArmor = 0;
    currentMagicResist = 0;
    effectiveArmourHealth = 0;
    effectiveMagicHealth = 0;
    effectiveMixedHealth = 0;

    equippedItems = [];
    formattedItems = [];
    orderedBy = 'armor';


    constructor(private staticDataService: StaticDataService) {
    }

    ngOnInit() {
        this.getChampions();
        this.getItems();
    }

    getChampions() {
        this.staticDataService.getChampions()
            .subscribe(data => {
                if (data.length > 0) {
                    let first = data.shift();
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    data.unshift(first);
                    this.champions = data;
                }
            }, err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function () {
                    fthis.getChampions();
                }, 1000);
            });
    }

    getItems() {
        this.staticDataService.getItems()
            .subscribe(data => {
                if (data.length > 0) {
                    this.items = data;
                    this.calculateEffectiveHealth();
                }
            }, err => {
                this.handleError(err);
                let fthis = this;
                setTimeout(function () {
                    fthis.getItems();
                }, 1000);
            });
    }

    calculateEffectiveHealth() {
        let adRatio = .5;
        if (this.championLevel > 18) {
            this.championLevel = 18;
        } else if (this.championLevel < 1) {
            this.championLevel = 1
        }
        let level = this.championLevel - 1;
        let itemStats = this.getItemStats();

        let champStats = JSON.parse(this.champions.find(data => data.id == this.champIdForEffectiveHealth).stats);
        let base_armor = Math.round(champStats.armor + (champStats.armorperlevel * level)),
            base_mr = Math.round(champStats.spellblock + (champStats.spellblockperlevel * level)),
            base_hp = Math.round(
                champStats.hp + (champStats.hpperlevel * level)
            );

        let currentHp = base_hp + (itemStats.health * ((100 + itemStats.percentBonusHealth)/100));
        this.currentHp = Math.round(currentHp);
        this.currentArmor = Math.round(base_armor + itemStats.armor);
        this.currentMagicResist = Math.round(base_mr + itemStats.magicResist);


        //console.log(itemStats.health,itemStats.percentBonusHealth);
        let effeciveHpArmor = Math.round((currentHp * ((100 + base_armor + itemStats.armor) / 100))),
            effeciveHpMagic = Math.round((currentHp * ((100 + base_mr + itemStats.magicResist) / 100))),
            effeciveHpMixed = Math.round((effeciveHpArmor * adRatio) + (effeciveHpMagic * (1 - adRatio)));

        this.baseHp = base_hp;
        this.baseArmour = base_armor;
        this.baseMagicResist = base_mr;
        this.effectiveArmourHealth = effeciveHpArmor;
        this.effectiveMagicHealth = effeciveHpMagic;
        this.effectiveMixedHealth = effeciveHpMixed;

        this.formattedItems = this.getEffectiveHealtItemList(itemStats , this.items, adRatio);
    }

    getItemStats() {
        let stats = {
            health: 0,
            armor: 0,
            magicResist: 0,
            percentBonusHealth: 0,
            cdReduction: 0,
            gold: 0
        };

        this.equippedItems.forEach(data => {
            stats.health += data.health;
            stats.armor += data.armor;
            stats.magicResist += data.magicresistance;
            stats.percentBonusHealth += data.percentBonusHealth;
            stats.cdReduction += data.cdReduction;
            stats.gold += data.gold;
        });
        return stats;
    }

    equipItem(data) {
        this.equippedItems.push(data);
        this.calculateEffectiveHealth();
    }

    unequipItem(id) {
        this.equippedItems.splice(id,1);
        this.calculateEffectiveHealth()
    }

    getEffectiveHealtItemList(itemStats, items, adRatio) {
        let arr = [];
        items.forEach((data) => {
            let oldHp,
                newHp,
                oldMrHp,
                newMrHp,
                oldArHp,
                newArHp,
                effHpArmor,
                effHpMagic,
                effHpMixed;

            oldHp = this.baseHp + ( itemStats.health * ((100 + itemStats.percentBonusHealth)/100) );
            newHp = this.baseHp + ( ( itemStats.health + data.health ) * ((100 + itemStats.percentBonusHealth + data.percentBonusHealth)/100) );

            oldArHp = (oldHp * ((100 + this.baseArmour + itemStats.armor) / 100));
            newArHp = (newHp * ((100 + this.baseArmour + itemStats.armor + data.armor) / 100));
            effHpArmor = Math.round(newArHp - oldArHp);

            oldMrHp = (oldHp * ((100 + this.baseMagicResist + itemStats.magicResist) / 100));
            newMrHp = (newHp * ((100 + this.baseMagicResist + itemStats.magicResist + data.magicresistance) / 100));
            effHpMagic = Math.round(newMrHp - oldMrHp);

            effHpMixed = Math.round((effHpArmor * adRatio) + (effHpMagic * (1 - adRatio)));

            let item = {
                data: data,
                id: data.id,
                name: data.name,
                gold: data.gold,
                effHpArmor: effHpArmor,
                effHpMagic: effHpMagic,
                goldEffHpArmor: this.roundDecimal( effHpArmor / data.gold , 2 ),
                goldEffHpMagic: this.roundDecimal( effHpMagic / data.gold , 2 ),
                effHpMixed: effHpMixed
            };
            arr.push(item);

        });

        return arr;
    }


    roundDecimal(number,nrOfDecimals) {
        return Math.round(number * 100) / 100;
    }



    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
