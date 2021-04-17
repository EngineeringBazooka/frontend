import { Component, OnInit } from '@angular/core';
import {Region} from '../../model/region';
import {StatisticsService} from '../../service/statisticsService';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private listRegion: Array<Region> = [
    { id: 1, name: 'Саратовская область', ITVacancy: 11.99, ITgraduate: 5.74, ITworker: 1.67,
      ITCompany: 2.17, medianZP: 2, impactITinGRP: 2.13, result: false },
    { id: 2, name: 'Самарская область', ITVacancy: 9, ITgraduate: 5, ITworker: 2,
      ITCompany: 9, medianZP: 11, impactITinGRP: 3, result: false },
    { id: 3, name: 'Московская область', ITVacancy: 22, ITgraduate: 4, ITworker: 5,
      ITCompany: 21, medianZP: 22, impactITinGRP: 20, result: true },
    { id: 4, name: 'Сахалинская область', ITVacancy: 10, ITgraduate:  3, ITworker: 7.7,
      ITCompany: 3.3, medianZP: 2.1, impactITinGRP: 2, result: false },
  ];
  public selectValue = 1;
  public curRegion: Region = this.listRegion[2] ;
  public result = '';
  title = 'front';
  constructor(private staticsService: StatisticsService) {
  }

  ngOnInit(): void{
    this.onSelection();
  }

  onSelection(): void{
    this.curRegion = this.listRegion[this.selectValue];
    this.resultOnPage();
  }
  resultOnPage(): void{
    if (this.curRegion?.result) {
      this.result = 'Профицит';
    }else {
      this.result = 'Дефицит';
    }
  }
}
