import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SelectSummonerComponent} from './components/select-summoner/select-summoner.component';
import {SummonerDataService} from "./services/summoner-data.service";

@NgModule({
    declarations: [
        AppComponent,
        SelectSummonerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [SummonerDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
