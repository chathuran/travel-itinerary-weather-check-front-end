import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  activeId= 1;
  constructor(public route: ActivatedRoute) { }
  links = [
    { title: 'Weather', fragment: 'weather' },
    { title: 'Favorites', fragment: 'favorites' }
  ];
  ngOnInit(): void {
  }

}
