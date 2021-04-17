import {Component, OnInit} from '@angular/core';
import {Region} from './model/region';
import {StatisticsService} from './service/statisticsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Orpheus';
  ngOnInit(): void {
  }
}
