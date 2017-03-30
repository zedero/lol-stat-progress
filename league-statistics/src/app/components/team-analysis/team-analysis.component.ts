import {Component, OnInit} from '@angular/core';
import {StaticDataService} from '../../services/static-data.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-team-analysis',
    templateUrl: './team-analysis.component.html',
    styleUrls: ['./team-analysis.component.css']
})
export class TeamAnalysisComponent implements OnInit {
    champions;
    lanes = [{
        lane:"top",
        champ:"Swain",
        data : []
    }, {
        lane:"jungle",
        champ:"Ivern",
        data : []
    }, {
        lane:"mid",
        champ:"Azir",
        data : []
    }, {
        lane:"adc",
        champ:"Jinx",
        data : []
    }, {
        lane:"support",
        champ:"Zyra",
        data : []
    }];

    teamdata = [{
        lane:"top",
        data : []
    }, {
        lane:"jungle",
        data : []
    }, {
        lane:"mid",
        data : []
    }, {
        lane:"adc",
        data : []
    }, {
        lane:"support",
        data : []
    }];

    constructor(private staticDataService: StaticDataService) {
    }

    ngOnInit() {
        this.getChampions();
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

    analyseTeamcomp(event) {
        console.log('', this.teamdata);
    }

    setChampionInTeam(event,lane) {
        console.log(lane);
        console.log(event.target.value);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}
//(change)="selectSummoner($event)"
