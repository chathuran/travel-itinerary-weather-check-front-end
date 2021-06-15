import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WeatherSummary} from "../../resource/WeatherSummary";

@Component({
  selector: 'app-weather-forecast-summery',
  templateUrl: './weather-forecast-summary.component.html',
  styleUrls: ['./weather-forecast-summary.component.scss']
})
export class WeatherForecastSummaryComponent implements OnInit {

  weatherSummary:WeatherSummary = new WeatherSummary();
  constructor(public dialogRef: MatDialogRef<WeatherForecastSummaryComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.weatherSummary= data.weatherSummary;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close({
    });
  }

}
