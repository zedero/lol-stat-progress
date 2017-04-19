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
    championLevel = 3;
    champIdForEffectiveHealth = 0;//412;

    baseHp = 0;
    baseArmour = 0;
    baseMagicResist = 0;
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
        let level = this.championLevel - 1; //(0-17) = level 1-18
        let itemStats = this.getItemStats();

        let champStats = JSON.parse(this.champions.find(data => data.id == this.champIdForEffectiveHealth).stats);
        let base_armor = Math.round(champStats.armor + (champStats.armorperlevel * level)) + itemStats.armor,
            base_mr = Math.round(champStats.spellblock + (champStats.spellblockperlevel * level)) + itemStats.magicResist,
            base_hp = Math.round(
                champStats.hp + (champStats.hpperlevel * level) + (itemStats.health * ((100 + itemStats.percentBonusHealth)/100))
            );
        console.log(itemStats.health,itemStats.percentBonusHealth);
        let effeciveHpArmor = Math.round((base_hp * ((100 + base_armor) / 100))),
            effeciveHpMagic = Math.round((base_hp * ((100 + base_mr) / 100))),
            effeciveHpMixed = Math.round((effeciveHpArmor * adRatio) + (effeciveHpMagic * (1 - adRatio)));

        this.formattedItems = this.getEffectiveHealtItemList(base_hp, base_mr, base_armor, itemStats.percentBonusHealth , this.items, adRatio);

        this.baseHp = base_hp;
        this.baseArmour = base_armor;
        this.baseMagicResist = base_mr;
        this.effectiveArmourHealth = effeciveHpArmor;
        this.effectiveMagicHealth = effeciveHpMagic;
        this.effectiveMixedHealth = effeciveHpMixed;

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

    getEffectiveHealtItemList(health, magicresists, armor, percentBonusHealth, items, adRatio) {
        let arr = [];
        items.forEach((data) => {
            let hp, mr, ar, effHpArmor, effHpMagic,effHpMixed;
            hp = health + data.health;
            mr = magicresists + data.magicresistance;
            ar = armor + data.armor;
            effHpArmor = Math.round((hp * ((100 + ar) / 100))) - Math.round((health * ((100 + armor) / 100)));
            effHpMagic = Math.round((hp * ((100 + mr) / 100))) - Math.round((health * ((100 + magicresists) / 100)));
            effHpMixed = Math.round((effHpArmor * adRatio) + (effHpMagic * (1 - adRatio)));

            let item = {
                data: data,
                id: data.id,
                name: data.name,
                gold: data.gold,
                effHpArmor: effHpArmor,
                effHpMagic: effHpMagic,
                effHpMixed: effHpMixed
            };
            arr.push(item);

        });

        return arr;
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
