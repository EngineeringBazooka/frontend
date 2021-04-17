import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Region} from '../model/region';

const API_URL = 'localhost:8080';

@Injectable({providedIn: 'root'})
export  class StatisticsService{

  private listRegion: Array<Region> = [
    { id: 1, name: 'Саратовская область', ITVacancy: 11.99, ITgraduate: 5.74, ITworker: 1.67,
      ITCompany: 2.17, medianZP: 2, impactITinGRP: 2.13, result: false },
    { id: 2, name: 'Самарская область', ITVacancy: 14, ITgraduate: 5, ITworker: 5,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: false },
    { id: 3, name: 'Московская область', ITVacancy: 19, ITgraduate: 5, ITworker: 5,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: true },
    { id: 4, name: 'Саратовская область', ITVacancy: 5, ITgraduate: 5, ITworker: 5,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: false },
    { id: 5, name: 'Саратовская область', ITVacancy: 5, ITgraduate: 5, ITworker: 5,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: true },
    { id: 6, name: 'Саратовская область', ITVacancy: 5, ITgraduate: 5, ITworker: 5,
      ITCompany: 5, medianZP: 5, impactITinGRP: 5, result: false },
  ];
  constructor(
    private http: HttpClient

  ) {
  }

  public getRegion(id: number): Region{
    return this.listRegion[id - 1];
  }
  // public getStatisticFromRegion(id: number): Observable<Region> {
  //   return this.http.get<Region>(API_URL + '/region/' + id);
  // }
  // public sendForm(form: FormGroup): Observable<any>{
  //   return  this.http.post(API_URL + '/form', form);
  // }
}
