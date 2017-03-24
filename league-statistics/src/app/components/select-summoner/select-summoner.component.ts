import {Component, OnInit} from '@angular/core';
import {SummonerDataService} from "../../services/summoner-data.service";



@Component({
    selector: 'select-summoner',
    templateUrl: './select-summoner.component.html',
    styleUrls: ['./select-summoner.component.css']
})
export class SelectSummonerComponent implements OnInit {
    summoners;

    constructor(private summonerDataService: SummonerDataService) {
    }

    ngOnInit() {
        this.getSummoners();
    }

    getSummoners() {
        this.summoners = this.summonerDataService.getSummonersList()
            //.subscribe(data => console.log(data))

        /*this.summonerDataService.getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error =>  this.errorMessage = <any>error);*/
    }
}
