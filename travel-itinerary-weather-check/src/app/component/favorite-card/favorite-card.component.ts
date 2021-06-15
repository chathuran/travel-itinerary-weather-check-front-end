import {Component, Input, OnInit} from '@angular/core';
import {ForecastResponse} from "../../resource/ForecastResponse";
import {WeatherService} from "../../service/weather.service";
import {HttpClient} from "@angular/common/http";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input()
  forecastResponse:ForecastResponse
  constructor(private weatherService:WeatherService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  removeFromFavorites(forecastResponse: ForecastResponse) {
    try {
      this.ngxService.start();
      const promise = this.weatherService.deleteFromFavorites(forecastResponse.city);
      promise.then(response => {
          // @ts-ignore
          let status=response.status;

            location.reload();

          // this.updateCityList(returnCityList);
          console.log(response);
          this.ngxService.stop();
        },
        error => {
          console.log(error);
          location.reload();
          this.ngxService.stop();
        });
    } catch (exception) {

      console.log(exception.message);
      this.ngxService.stop();
    }
  }
}
