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
    { id: 1, name: 'Саратовская область', ITVacancy: 7, ITgraduate: 18, ITworker: 58,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: true },
    { id: 2, name: 'Самарская область', ITVacancy: 25, ITgraduate: 75, ITworker: 5,
      ITCompany: 9, medianZP: 11, impactITinGRP: 15, result: false },
    { id: 3, name: 'Московская область', ITVacancy: 5, ITgraduate: 5, ITworker: 5,
      ITCompany: 21, medianZP: 22, impactITinGRP: 16, result: true },
    { id: 4, name: 'Сахалинская область', ITVacancy: 3.5, ITgraduate:8, ITworker: 7.7,
      ITCompany: 3.3, medianZP: 2.1, impactITinGRP: 5.7, result: false },
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
      this.result = 'Дефицит';
    }else {
      this.result = 'Профицит';
    }
  }
}
