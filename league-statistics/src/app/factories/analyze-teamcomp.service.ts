import {Injectable} from '@angular/core';

@Injectable()
export class AnalyzeTeamcompService {

    staticChampionData;
    averages = {
        attack:0,
        magic: 0,
        defence_armour: 0,
        defence_magic: 0,
        crowdcontrol: 0,
        heal:0,
        shield:0

    };

    threshold = {
        cc: {
            low:        1,
            medium:     10,
            high:       25,
            dangerous:  35,
            ludicrous:  45
        }
    };

    constructor() {
    }

    setStaticData(data) {
        this.staticChampionData = data;
        this.averages.attack = this.getAverageFromStatic(data,'attack');
        this.averages.magic = this.getAverageFromStatic(data,'magic');
        this.averages.defence_armour = this.getAverageFromStatic(data,'defence_armour');
        this.averages.defence_magic = this.getAverageFromStatic(data,'defence_magic');
        this.averages.crowdcontrol = this.getAverageFromStatic(data,'crowdcontrol');
        this.averages.heal = this.getAverageFromStatic(data,'heal');
        this.averages.shield = this.getAverageFromStatic(data,'shield');
    }



    getAverageFromStatic(array,key) {

        //let extremePerc = Math.round(array.length / 10 / 2);
        //array = array.slice(extremePerc , array.length - extremePerc);


        let total = 0;
        array.forEach((data,index) => {
            total += data[key];
        });

        return Math.round((total / array.length) * 100) / 100;
    }



    getAttackStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.attack;
            if(champion.data.attack >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    getMagicStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.magic;
            if(champion.data.magic >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    getDefenceArmourStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.defence_armour;
            if(champion.data.defence_armour >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    getDefenceMagicStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.defence_magic;
            if(champion.data.defence_magic >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    getCrowdControlStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        let highCcThreats = 0;

        teamData.forEach(champion => {
            strength += champion.data.crowdcontrol;
            if(champion.data.crowdcontrol >= 8) {
                modifier += 2;
                highCcThreats++;
                //modifier += Math.round(champion.data.crowdcontrol / 2);
            }
        });
        /*threshold = {
         cc: {
         low:        1,
         medium:     10,
         high:       25,
         dangerous:  35,
         ludicrous:  45
         }
         };*/
        console.log('threats: ',highCcThreats);

        return strength + modifier;
    }

    getHealStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.heal;
            if(champion.data.heal >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    getShieldStrength(teamData) {
        let strength = 0;
        let modifier = 0;
        teamData.forEach(champion => {
            strength += champion.data.shield;
            if(champion.data.shield >= 7) {
                modifier += 2;
            }
        });

        return strength + modifier;
    }

    judgementOnData(data) {
        let ad = this.getAttackStrength(data),
            md = this.getMagicStrength(data),
            defa = this.getDefenceArmourStrength(data),
            defm = this.getDefenceMagicStrength(data),
            cc = this.getCrowdControlStrength(data),
            heal = this.getHealStrength(data),
            shield = this.getShieldStrength(data),
            AD_DM_RATIO = Math.round(( ad / (ad+md)) * 100) / 100,
            def = ((defa + defm) / 2) + (heal/4) + (shield/4);

        console.log(this.averages);
        console.log("top: ",    data[0].data.name, data[0].data.tags);
        console.log("jungle: ", data[1].data.name, data[1].data.tags);
        console.log("mid: ",    data[2].data.name, data[2].data.tags);
        console.log("adc: ",    data[3].data.name, data[3].data.tags);
        console.log("support: ",data[4].data.name, data[4].data.tags);

        console.log("AD: ",ad);
        console.log("MD: ",md);
        console.log("DefA: ",defa);
        console.log("DefM: ",defm);
        console.log("Resilliance: ",def);
        console.log("CC: ",cc);
        console.log("Heal: ",heal);
        console.log("Shield: ",shield);
        console.log("AD percentage: ", AD_DM_RATIO);
        console.log("");
        console.log("====== Analyze ======");

        //--------
        // Damage
        if(AD_DM_RATIO > .59) {
            if(AD_DM_RATIO > .64) {
                console.log('The team deals extreme ammounts of physical damage (' + Math.round(AD_DM_RATIO*100) +'%)' );
            } else {
                console.log('The team deals more physical then magic damage (' + Math.round(AD_DM_RATIO*100) +'%)');
            }
        } else if(AD_DM_RATIO < .41) {
            if(AD_DM_RATIO < .36) {
                console.log('The team deals extreme ammounts of magic damage (' + Math.round(100-(AD_DM_RATIO*100)) +'%)');
            } else {
                console.log('The team deals more magic then ad damage (' + Math.round(100-(AD_DM_RATIO*100)) +'%)');
            }
        } else {
            console.log('The team deals mixed damage (' + Math.round(AD_DM_RATIO*100) +'% AD / '+Math.round(100-(AD_DM_RATIO*100))+' % MD)');
        }

        //--------
        // Defence
        if(def >= 40) {
            console.log("Team has a extremely resilliant composition");
        } else if(def >= 30) {
            console.log("Team has a resilliant composition");
        } else if (def >= 20){
            console.log("Team has a moderately resilliant composition");
        } else {
            console.log("Team has a squishy composition.");
        }

        //--------
        // Crowd control

        if (cc >= this.threshold.cc.ludicrous) {
            console.log("Team has ludicrous ammounts of Crowd Control. All aboard the CC train");
        } else if (cc >= this.threshold.cc.dangerous) {
            console.log("Team has dangerous ammounts of Crowd Control. Strongly recommed itemizing against it");
        } else if (cc >= this.threshold.cc.high) {
            console.log("Team has high ammounts of Crowd Control. Consider itemizing against it");
        } else if (cc > this.threshold.cc.medium) {
            console.log("Team has medium ammounts of Crowd Control");
        } else if (cc >= this.threshold.cc.low) {
            console.log("Team has low ammounts of Crowd Control");
        } else {
            console.log("Team has no Crowd Control");
        }

        //--------
        // Healing
        if(heal >= 20) {
            console.log("Team has a large ammount of healing. Highly consider buying  Morellonomicon's, Executioner's Calling or Mortal Reminder");
        } else if (heal >= 11){
            console.log("Team has some fair ammount of healing. Consider itemizing against it later during the game.");
        }

        //--------
        // Shields
        if(shield >= 20) {
            console.log("Team has a extreme ammount of shields.");
        } else if(shield >= 13) {
            console.log("Team has a large ammount of shields.");
        } else if (shield >= 9){
            console.log("Team has some fair ammount of shields.");
        }


    }

}
