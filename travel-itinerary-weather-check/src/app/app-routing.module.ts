import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherForecastComponent} from "./component/weather-forecast/weather-forecast.component";
import {FavoriteWeatherComponent} from "./component/fevorite-weather/favorite-weather.component";

const routes: Routes = [
  // {
  //   path: '**',
  //   component: WeatherForecastComponent
  // },
  {
    path: 'weather',
    component: WeatherForecastComponent
  },
  {
    path: 'favorites',
    component: FavoriteWeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
