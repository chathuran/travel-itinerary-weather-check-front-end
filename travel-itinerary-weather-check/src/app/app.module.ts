import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherForecastSummaryComponent } from './component/weather-forecast-summary/weather-forecast-summary.component';
import { WeatherForecastComponent } from './component/weather-forecast/weather-forecast.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./service/weather.service";
import {HttpClientModule} from "@angular/common/http";
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import { FavoriteWeatherComponent } from './component/fevorite-weather/favorite-weather.component';
import { HeaderComponent } from './component/header/header.component';
import { WeatherForecastCardComponent } from './component/weather-forecast-card/weather-forecast-card.component';
import { FavoriteCardComponent } from './component/favorite-card/favorite-card.component';
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {ToastrModule} from "ngx-toastr";
import { WeatherSummaryCardComponent } from './component/weather-summary-card/weather-summary-card.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastSummaryComponent,
    WeatherForecastComponent,
    FavoriteWeatherComponent,
    HeaderComponent,
    WeatherForecastCardComponent,
    FavoriteCardComponent,
    WeatherSummaryCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    AutocompleteLibModule,
    TypeaheadModule.forRoot(),
    NgxUiLoaderModule,
    ToastrModule.forRoot()
  ],
  providers: [WeatherService],

  bootstrap: [AppComponent]
})
export class AppModule { }
