import {Component, Input, OnInit} from '@angular/core';
import {Temperature} from "../../resource/Temperature";
import {WEATHER_STATUS} from "../../resource/WeatherSummary";

declare const myTest: any;

@Component({
  selector: 'app-weather-summary-card',
  templateUrl: './weather-summary-card.component.html',
  styleUrls: ['./weather-summary-card.component.scss']
})
export class WeatherSummaryCardComponent implements OnInit {

  @Input()
  timelyWeatherDetails: Temperature;

  constructor() {
  }

  ngOnInit(): void {
  }

  getWeatherStatusStyleClass(weatherCon: string): string {
    if(weatherCon.includes(WEATHER_STATUS.RAIN) || weatherCon.includes(WEATHER_STATUS.DRIZZLE)){
      return WEATHER_STATUS.RAIN;
    }
    else if(weatherCon.includes(WEATHER_STATUS.THUNDER) || weatherCon.includes(WEATHER_STATUS.TORNADO)){
      return WEATHER_STATUS.THUNDER;
    }
    else if(weatherCon.includes(WEATHER_STATUS.SNOW)){
      return WEATHER_STATUS.SNOW;
    }
    else{
      return WEATHER_STATUS.CLEAR;
    }
  }
}
