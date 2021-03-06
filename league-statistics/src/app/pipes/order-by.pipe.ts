import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(arr: any, args?: any): any {
        if(args === "armor") {
            arr = arr.sort(function (b, a) {
                return a.effHpArmor - b.effHpArmor
            });
        }
        if(args === "magic") {
            arr = arr.sort(function (b, a) {
                return a.effHpMagic - b.effHpMagic
            });
        }
        if(args === "mixed") {
            arr = arr.sort(function (b, a) {
                return a.effHpMixed - b.effHpMixed
            });
        }
        if(args === "gold_armor") {
            arr = arr.sort(function (b, a) {
                return a.goldEffHpArmor - b.goldEffHpArmor
            });
        }
        if(args === "gold_magic") {
            arr = arr.sort(function (b, a) {
                return a.goldEffHpMagic - b.goldEffHpMagic
            });
        }
        return arr;
    }

}
