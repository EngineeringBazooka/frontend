import { Component, OnInit } from '@angular/core';
import {Region} from '../../model/region';
import {StatisticsService} from '../../service/statisticsService';
import * as ChartJS from 'chart.js';
import {Chart} from 'chart.js';

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
  public readonly maxMedianZP: number;
  public medianZPCoef: number;
  public selectValue = 1;
  public curRegion: Region = this.listRegion[2];
  public result = '';
  title = 'front';


  private charts: Chart[];

  constructor(private staticsService: StatisticsService) {
    this.maxMedianZP = Number.MIN_VALUE;
    for (const reg of this.listRegion) {
      this.maxMedianZP = Math.max(this.maxMedianZP, reg.medianZP);
    }
    this.medianZPCoef = 0;

    // @ts-ignore
    ChartJS.Chart.register.apply(null, Object.values(ChartJS).filter((chartClass) => (chartClass.id)));

    this.charts = [];
  }

  ngOnInit(): void{
    this.onSelection();
  }

  onSelection(): void{
    this.curRegion = this.listRegion[this.selectValue];
    this.medianZPCoef = (this.curRegion.medianZP / this.maxMedianZP);
    this.medianZPCoef *= 100;
    this.medianZPCoef -= this.medianZPCoef % 1;
    this.resultOnPage();
  }
  resultOnPage(): void{
    if (this.curRegion?.result) {
      this.result = 'Профицит';
    }else {
      this.result = 'Дефицит';
    }
    for (const chart of this.charts) { chart.destroy(); }
    this.charts = [];

    this.drawCountGraphs();
    this.drawEcoGraphs();
    this.drawGraduateGraphs();
  }
  ngAfterViewInit(): void {
  }
  drawCountGraphs(): void {

    const canvas = document.querySelector('#graph-count canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const data = {
      labels: [
        'IT Компании(%).',
        'IT Работников(%).',
        'IT Вакансий(%).'
      ],
      datasets: [{
        label: '',
        data: [
          this.curRegion.ITCompany,
          this.curRegion.ITworker,
          this.curRegion.ITVacancy
        ],
        borderColor: '#f00',
        backgroundColor: '#f008'
      }]
    };

    const config = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: top
          }
        }
      }
    };

    // @ts-ignore
    this.charts.push(new ChartJS.Chart(ctx, config));
  }

  drawEcoGraphs(): void {

    const canvas = document.querySelector('#graph-economics canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const data = {
      labels: [
        'Медиана зарплат',
        'Вклад в ВПР(%).'
      ],
      datasets: [{
        label: '',
        data: [
          this.medianZPCoef,
          this.curRegion.impactITinGRP
        ],
        borderColor: '#ff0',
        backgroundColor: '#ff08'
      }]
    };

    const config = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: top
          }
        }
      }
    };

    // @ts-ignore
    this.charts.push(new ChartJS.Chart(ctx, config));
  }

  drawGraduateGraphs(): void {

    const canvas = document.querySelector('#graph-graduates canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const data = {
      labels: [
        'Количество студентов, выпускающихся в этом году(%).',
      ],
      datasets: [{
        label: '',
        data: [
          this.curRegion.ITgraduate,
          100
        ],
        borderColor: [
          '#08f',
          '#0ff'
        ],
        backgroundColor: [
          '#08f8',
          '#0ff8'
        ]
      }]
    };

    const config = {
      type: 'pie',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: top
          }
        }
      }
    };

    // @ts-ignore
    this.charts.push(new ChartJS.Chart(ctx, config));
  }
}
