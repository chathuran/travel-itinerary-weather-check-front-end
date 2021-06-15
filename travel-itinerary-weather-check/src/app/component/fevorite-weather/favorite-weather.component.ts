import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {ForecastResponse} from "../../resource/ForecastResponse";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-fevorite-weather',
  templateUrl: './favorite-weather.component.html',
  styleUrls: ['./favorite-weather.component.scss']
})
export class FavoriteWeatherComponent implements OnInit {
  forecastResponseList: ForecastResponse[] = [];
  selectedForecastDetails:ForecastResponse;
  selectedDate:Date = new Date();
  constructor(private weatherService: WeatherService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getFavoriteWeatherForecast();
  }
  getFavoriteWeatherForecast() {
    try {
      this.ngxService.start();
      const promise = this.weatherService.getFavoritesWeather();
      promise.then(response => {
          // @ts-ignore
          this.forecastResponseList = response;
          this.selectedForecastDetails = this.forecastResponseList[0];
          // this.updateCityList(returnCityList);
          console.log(response);
          this.ngxService.stop();
        },
        error => {
          console.log(error);
          this.ngxService.stop();
        });
    } catch (exception) {

      console.log(exception.message);
      this.ngxService.stop();
    }
  }

  getSelectedFavWeatherDetails(forecastResponse: ForecastResponse) {
    this.selectedForecastDetails = forecastResponse;
  }
}
