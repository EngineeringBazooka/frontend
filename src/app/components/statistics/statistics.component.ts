import {Component, OnInit} from '@angular/core';
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
    {
      id: 1, name: 'Саратовская область', ITVacancy: 11.99, ITgraduate: 5.74, ITworker: 1.67,
      ITCompany: 2.17, medianZP: 2, impactITinGRP: 2.13, result: false
    },
    {
      id: 2, name: 'Самарская область', ITVacancy: 9, ITgraduate: 5, ITworker: 2,
      ITCompany: 9, medianZP: 11, impactITinGRP: 3, result: false
    },
    {
      id: 3, name: 'Московская область', ITVacancy: 22, ITgraduate: 4, ITworker: 5,
      ITCompany: 21, medianZP: 22, impactITinGRP: 20, result: true
    },
    {
      id: 4, name: 'Сахалинская область', ITVacancy: 10, ITgraduate: 3, ITworker: 7.7,
      ITCompany: 3.3, medianZP: 2.1, impactITinGRP: 2, result: false
    },
  ];
  public readonly maxMedianZP: number;
  public medianZPCoef: number;
  public selectValue = 1;
  public curRegion: Region = this.listRegion[0];
  public result = '';
  private chartType: 'bar' | 'pie' = 'pie';
  title = 'Orpheus';

  private charts: Chart[];
  private studentsSum: number;

  constructor(private staticsService: StatisticsService) {
    this.maxMedianZP = Number.MIN_VALUE;
    this.studentsSum = 0;

    for (const reg of this.listRegion) {
      this.maxMedianZP = Math.max(this.maxMedianZP, reg.medianZP);
      this.studentsSum += reg.ITgraduate;
    }
    this.medianZPCoef = 0;

    // @ts-ignore
    ChartJS.Chart.register.apply(null, Object.values(ChartJS).filter((chartClass) => (chartClass.id)));

    this.charts = [];


  }

  ngOnInit(): void {
    this.onSelection();
  }

  onSelection(): void {
    this.curRegion = this.listRegion[this.selectValue - 1];
    this.medianZPCoef = (this.curRegion.medianZP / this.maxMedianZP);
    this.medianZPCoef *= 100;
    this.medianZPCoef -= this.medianZPCoef % 1;
    this.resultOnPage();
  }

  resultOnPage(): void {
    if (this.curRegion?.result) {
      this.result = 'Профицит';
    } else {
      this.result = 'Дефицит';
    }

    for (const chart of this.charts) {
      chart.destroy();
    }
    this.charts = [];
    this.drawCountGraph();
    this.drawEcoGraph();
    this.drawGraduateGraph();
  }

  drawCountGraph(): void {
    this.drawGraph(
      document.querySelector('#graph-count canvas') as HTMLCanvasElement,
      ['IT Компании(%).', 'Остальные компании(%)', 'IT Работников(%).', 'Остальные работники(%)', 'IT Вакансий(%).', 'Остальные вакансии(%)'],
      [this.curRegion.ITCompany, this.curRegion.ITworker, this.curRegion.ITVacancy],
      [['#f00', '#b00'], ['#ff0', '#bb0'], ['#4f4', '#3b3']],
      this.chartType
    );
  }

  drawEcoGraph(): void {
    this.drawGraph(
      document.querySelector('#graph-economics canvas') as HTMLCanvasElement,
      ['Медиана зарплат(%)', 'Недостаток до наивысшего показателя(%)', 'Вклад в ВРП(%).', 'Вклад остальных компаний в ВРП(%)'],
      [this.medianZPCoef, this.curRegion.impactITinGRP],
      [['#ffb700', '#cb9205'], ['#00eaff', '#00bfbf']],
      this.chartType
    );
  }

  drawGraduateGraph(): void {
    this.drawGraph(
      document.querySelector('#graph-graduates canvas') as HTMLCanvasElement,
      ['Количество студентов, выпускающихся в этом году(%).', 'Количество студентов, выпускающихся в других регионах(%)'],
      [this.curRegion.ITgraduate],
      [['#08f', '#069']],
      'pie'
    );
  }

  drawGraph(canvas: HTMLCanvasElement,
            labels: string[],
            data: number[],
            colors: string[][],
            type: string
  ): void {

    const ctx = canvas.getContext('2d');

    let colIncr = colors[0][0].length === 4 ? '8' : '88';

    let datasets = [];

    if (type === 'pie') {
      for (let i = 0; i < data.length; i++) {
        datasets.push({
          data: [data[i], 100 - data[i]],
          backgroundColor: colors[i].map((color: string) => color + colIncr),
        })
      }
    } else {
      datasets.push({
        data: data,
        backgroundColor: colors.map((color: string[]) => color[0] + colIncr),
      });
      labels = labels.filter((e, i) => i % 2 === 1);
    }

    // @ts-ignore
    this.charts.push(new ChartJS.Chart(ctx, {
        type,
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: type === 'pie' ? 'bottom' : 'none',
              labels: {
                generateLabels: function(chart) {
                  const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
                  const labelsOriginal = original.call(this, chart);

                  let datasetColors = chart.data.datasets.map(function(e) {
                    return e.backgroundColor;
                  });
                  // @ts-ignore
                  datasetColors = datasetColors.flat();

                  labelsOriginal.forEach(label => {
                    // @ts-ignore
                    label.datasetIndex = (label.index - label.index % 2) / 2;
                    label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                    // @ts-ignore
                    label.fillStyle = datasetColors[label.index];
                  });

                  return labelsOriginal;
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                  // @ts-ignore
                  return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
                }
              }
            }
          }
        }
      }
    ));
  }
}

