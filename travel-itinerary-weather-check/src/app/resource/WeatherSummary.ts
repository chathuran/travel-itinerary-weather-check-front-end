import {Temperature} from "./Temperature";
export const WEATHER_STATUS = {
  CLOUD: 'Clouds',
  CLEAR: 'Clear',
  MIST: 'Mist',
  SMOKE: 'Smoke',
  HAZE: 'Haze',
  DUST: 'Dust',
  FOG: 'Fog',
  RAIN: 'Rain',
  DRIZZLE: 'Drizzle',
  SNOW: 'Snow',
  SAND: 'Sand',
  ASH: 'Ash',
  SQUALL: 'Squall',
  THUNDER: 'Thunderstorm',
  TORNADO: 'Tornado'
}

export class WeatherSummary {

  cityName:string;
  countryCode:string;
  minTemp:number;
  maxTemp:number;
  date:any;
  weatherSummeryMessage:string;
  temperatureList:Temperature[]

}
