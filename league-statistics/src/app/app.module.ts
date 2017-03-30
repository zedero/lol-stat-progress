import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SelectSummonerComponent} from './components/select-summoner/select-summoner.component';
import {SummonerDataService} from "./services/summoner-data.service";
import {StaticDataService} from "./services/static-data.service";
import {SummonerGraphsComponent} from './components/summoner-graphs/summoner-graphs.component';
import {TeamAnalysisComponent} from './components/team-analysis/team-analysis.component';

@NgModule({
    declarations: [
        AppComponent,
        SelectSummonerComponent,
        SummonerGraphsComponent,
        TeamAnalysisComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [SummonerDataService, StaticDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
