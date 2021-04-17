import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'localhost:8080';

@Injectable({providedIn: 'root'})
export  class StatisticsService{
  constructor(
    private http: HttpClient

  ) {
  }

  // public getStatisticFromRegion(id: number): Observable<Region> {
  //   return this.http.get<Region>(API_URL + '/region/' + id);
  // }
  // public sendForm(form: FormGroup): Observable<any>{
  //   return  this.http.post(API_URL + '/form', form);
  // }
}
