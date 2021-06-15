import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {City} from "../../resource/City";
import {WeatherService} from "../../service/weather.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {WeatherForecastSummaryComponent} from "../weather-forecast-summary/weather-forecast-summary.component";
import {WeatherSummary} from "../../resource/WeatherSummary";
import {Temperature} from "../../resource/Temperature";
// @ts-ignore
// import  *  as  CITIES  from  '../../data-json/city-list.json';
import {Observable, OperatorFunction, ReplaySubject} from "rxjs";
import {CityItem} from "../../data-json/CityItem";
import {HttpClient} from "@angular/common/http";
import {TypeaheadDirective, TypeaheadMatch} from "ngx-bootstrap/typeahead";
import {debounceTime, distinctUntilChanged,map} from "rxjs/operators";
import {ForecastResponse} from "../../resource/ForecastResponse";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastrService} from "ngx-toastr";
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})


export class WeatherForecastComponent implements OnInit {

  public selectedCity: any;

  lastSearchClickTime: Date;
  allCityList:string []= [];
  filteredCities: CityItem[]= [];
  forecastResponseList: ForecastResponse[] = [];
  selectedDate:Date;
  minDate: Date = new Date();
  maxDate: Date;
  submitForm = new FormGroup({
    city: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required)
  })

  constructor(private weatherService: WeatherService

              ,private httpClient: HttpClient
              ,private ngxService: NgxUiLoaderService) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 4);
  }

  ngOnInit(): void {
    this.submitForm.controls['date'].setValue(this.minDate);
    this.httpClient.get('assets/data-json/city-list.json').subscribe(data =>{

      let cityListJson:any= data;
      for (let jsonObj of cityListJson) {
        this.allCityList.push(jsonObj.name+","+jsonObj.country);
      }
    })
  }

  search: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.allCityList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  submit() {
    if (!this.submitForm.valid) {
      return;
    }
    let cityName = this.submitForm.controls['city'].value.toUpperCase();
    console.log(cityName);
    let date = this.submitForm.controls['date'].value;
    this.getWeatherForecast(cityName, date);
    // let currentTime: Date = new Date();
    // let timeDif: number = (currentTime.getTime() - this.minDate.getTime()) * 0.00006;
    //
    // ///check previous searched within 1 hour
    // if (timeDif > 60) {
    //   //feed data from back end
    //   this.getWeatherForecast(cityName, date);
    // } else {
    //
    //   /**
    //    * check the user searched city and the date previously and within 1 hour
    //    * and result already in front end
    //    *
    //    */
    //
    //   let isAvailable = this.isSearchedCityAndDateAlreadyInTheCache(cityName, date)
    //
    //   if (isAvailable) {
    //     //toast message to user search date is in the table and upto date
    //     console.log("Required Data in the Table");
    //   } else {
    //
    //     //feed data from back end
    //     this.getWeatherForecast(cityName, date);
    //   }
    // }
  }

  getWeatherForecast(cityName: string, date: any) {
    try {
      this.ngxService.start();
      this.selectedDate = date;
      const promise = this.weatherService.getWeather(cityName, date);

      promise.then(response => {
          // @ts-ignore
          this.forecastResponseList = response;
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

  // /**
  //  * view availability of the weather details in front end according to the search values
  //  * @param city
  //  * @param date
  //  */
  // isSearchedCityAndDateAlreadyInTheCache(city: string, date: any): boolean {
  //   let isAvailable: boolean = false;
  //   for (let item of this.cityList) {
  //
  //     if (item.cityId.cityName === city && item.temperatures[0].date === date) {
  //       isAvailable = true;
  //     } else {
  //       isAvailable = false;
  //     }
  //   }
  //   return isAvailable;
  // }

  // updateCityList(newCityList: City[]) {
  //   for (let newItem of newCityList) {
  //     for (let oldItem of this.cityList) {
  //       if (newItem.cityId.cityName === oldItem.cityId.cityName && newItem.cityId.countryCode === oldItem.cityId.countryCode && newItem.temperatures[0].date === oldItem.temperatures[0].date) {
  //         let index: number = this.cityList.indexOf(oldItem);
  //         this.cityList.splice(index, 1);
  //       }
  //     }
  //     this.cityList.push(newItem);
  //
  //   }
  //
  //
  // }

  clear() {
    this.submitForm.controls['city'].setValue("");
    this.submitForm.controls['date'].setValue("");
    this.forecastResponseList = [];
  }
}
