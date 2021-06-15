import {Component, Input, OnInit} from '@angular/core';
import {ForecastResponse} from "../../resource/ForecastResponse";
import {City} from "../../resource/City";
import {WeatherService} from "../../service/weather.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {WeatherForecastSummaryComponent} from "../weather-forecast-summary/weather-forecast-summary.component";
import {WEATHER_STATUS, WeatherSummary} from "../../resource/WeatherSummary";
import {Temperature} from "../../resource/Temperature";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-weather-forecast-card',
  templateUrl: './weather-forecast-card.component.html',
  styleUrls: ['./weather-forecast-card.component.scss']
})
export class WeatherForecastCardComponent implements OnInit {

  @Input()
  forecastResponse: ForecastResponse
  @Input()
  isFavorites:boolean = false
  @Input()
  selectedDate: string;

  constructor(private weatherService: WeatherService,
              public dialog: MatDialog,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  addToFavorites(city: City) {
    let favCity: City = new City();
    favCity.cityId = city.cityId;
    try {

      const promise = this.weatherService.addToFavorites(favCity);
      promise.then(response => {
          // @ts-ignore
          let city = response;

          console.log(response);
          this.toastr.success(favCity.cityId.cityName + ' City Added to Favorite List', 'Successes');
        },
        error => {
          console.log(error);
          this.toastr.error('Something went wrong', 'Error');
        });
    } catch (exception) {

      console.log(exception.message);
      this.toastr.error('Something went wrong', 'Error');
    }

  }

  changeSelectedDateItemStyle(date: any): string {
    let selectedDate= formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
    if(selectedDate === date){
      return 'row-active';
    }else {
      return '';
    }
  }

  viewSummary(listItem:Temperature[],city:City,date:string){


    const dialogRefSummaryModal = this.dialog.open(WeatherForecastSummaryComponent,{
      height: '78%',
      width: '40%',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'custom-modal',

      data: { weatherSummary:this.generateSummary(listItem,city,date) }
    });
    dialogRefSummaryModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  generateSummary(temperatureList:Temperature[],city:City,date:string):WeatherSummary{
    let weatherSummary:WeatherSummary = new WeatherSummary();

      weatherSummary.cityName = city.cityId.cityName;
      weatherSummary.countryCode = city.cityId.countryCode;
      weatherSummary.date =date;
      weatherSummary.minTemp = this.getMinTempFromTempList(temperatureList);
      weatherSummary.maxTemp = this.getMaxTempFromTempList(temperatureList);
      weatherSummary.temperatureList = temperatureList;

      if(weatherSummary.minTemp < 5){

        if(this.isRainForecast(temperatureList)){
            weatherSummary.weatherSummeryMessage = "Ohh! It is cold and also a chance of rains. We advice you to take both your umbrella and coat with you when you go out. ";
        }else {
            weatherSummary.weatherSummeryMessage = "Cold weather! We advice you to take a coat with you when you go out.";
        }
      }else {
        if(this.isRainForecast(temperatureList)){
          weatherSummary.weatherSummeryMessage = "High chance of rains! Much better to take an umbrella when you go out."
        }else {
          weatherSummary.weatherSummeryMessage ="What a nice weather today! Best time for you to travel.";
        }


    }
    return weatherSummary;


  }

  getMinTempFromTempList(tempList:Temperature[]):number{
    let minTemp:number = 100;
    for (let tempItem of tempList) {
      if(tempItem.temp < minTemp){
        minTemp = tempItem.temp;
      }

    }
    return minTemp;
  }
  getMaxTempFromTempList(tempList:Temperature[]):number{
    let maxTemp:number = -100;
    for (let tempItem of tempList) {
      if(tempItem.temp > maxTemp){
        maxTemp = tempItem.temp;
      }

    }
    return maxTemp;
  }
  isRainForecast(tempList:Temperature[]):boolean{
    let raining: boolean = false;
    for (let tempItem of tempList) {

      if(tempItem.weather.includes(WEATHER_STATUS.RAIN) || tempItem.weather.includes(WEATHER_STATUS.SNOW) || tempItem.weather.includes(WEATHER_STATUS.DRIZZLE) || tempItem.weather.includes(WEATHER_STATUS.THUNDER) || tempItem.weather.includes(WEATHER_STATUS.TORNADO)){
          raining = true;
      }
    }
    return raining;
  }

  isSelectedDate(weatherDate:string):boolean{

    let selectedDate= formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
     if(selectedDate === weatherDate){
      return true;
     }else {
       return false;
     }
  }
}
