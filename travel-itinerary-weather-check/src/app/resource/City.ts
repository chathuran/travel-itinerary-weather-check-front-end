import {CityId} from "./CityId";
import {Temperature} from "./Temperature";

export class City{
  cityId:CityId;
  temperatures:Temperature[];
  createdDate:Date;

  constructor() {
  }
}
