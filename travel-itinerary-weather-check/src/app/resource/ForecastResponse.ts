import {City} from "./City";
import {Temperature} from "./Temperature";

export class ForecastResponse{
  city:City;
  temperatureMapList: Map<any,Temperature[]> ;
}
