import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { RouterModule }   from '@angular/router';

import {AppComponent} from './app.component';
import {SelectSummonerComponent} from './components/select-summoner/select-summoner.component';
import {SummonerDataService} from "./services/summoner-data.service";
import {StaticDataService} from "./services/static-data.service";
import {AnalyzeTeamcompService} from "./factories/analyze-teamcomp.service";
import {SummonerGraphsComponent} from './components/summoner-graphs/summoner-graphs.component';
import {TeamAnalysisComponent} from './components/team-analysis/team-analysis.component';
import {TankItemizerComponent} from './components/tank-itemizer/tank-itemizer.component';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SelectSummonerComponent,
        SummonerGraphsComponent,
        TeamAnalysisComponent,
        TankItemizerComponent,
        OrderByPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            {
                path: '',
                component: TeamAnalysisComponent //SummonerGraphsComponent
            },
            {
                path: 'team-analysis',
                component: TeamAnalysisComponent
            },
            {
                path: 'tank-itemizer',
                component: TankItemizerComponent
            }
        ])
    ],
    providers: [SummonerDataService, StaticDataService, AnalyzeTeamcompService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
