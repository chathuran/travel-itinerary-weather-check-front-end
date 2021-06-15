import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {City} from "../resource/City";
import {FavoriteCity} from "../resource/FavoriteCity";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {

  }

  /**
   *
   * @param city
   * @param date
   */
  getWeather(city:string,date:string) {
    const url = '/api/weather/getWeather?city='+city+'&date='+date;
    return new Promise((resolve, reject) =>
      this.http.get<City>(url, )
        .subscribe(
          response => {
            console.log("test");
            resolve(response);
          },
          error => {
            console.log(error);
            reject(error);
          }
        )
    );

  }

  getFavoritesWeather() {
    const url = '/api/weather/getFavoriteWeather';
    return new Promise((resolve, reject) =>
      this.http.get<City>(url, )
        .subscribe(
          response => {
            console.log("test");
            resolve(response);
          },
          error => {
            console.log(error);
            reject(error);
          }
        )
    );

  }
  addToFavorites(city:City) {
    const url = '/api/weather/addToFavorites';
    return new Promise((resolve, reject) =>
      this.http.post<FavoriteCity>(url,city )
        .subscribe(
          response => {
            console.log("test");
            resolve(response);
          },
          error => {
            console.log(error);
            reject(error);
          }
        )
    );

  }

  deleteFromFavorites(city:City) {
    const url = '/api/weather/removeFromFavorites';
    return new Promise((resolve, reject) =>
      this.http.post<City>(url,city )
        .subscribe(
          response => {
            console.log("test");
            resolve(response);
          },
          error => {
            console.log(error);
            reject(error);
          }
        )
    );

  }
}
