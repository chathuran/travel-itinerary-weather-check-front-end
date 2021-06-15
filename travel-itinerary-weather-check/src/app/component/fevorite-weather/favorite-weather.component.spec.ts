import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWeatherComponent } from './favorite-weather.component';

describe('FevoriteWeatherComponent', () => {
  let component: FavoriteWeatherComponent;
  let fixture: ComponentFixture<FavoriteWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
