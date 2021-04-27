import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Horario} from '../models/horario';


// @ts-ignore
@Injectable()
export class HorarioSettingsService {

  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getHorario(id, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'horario/' + id, {headers});
  }


  registerHorario(horario: Horario, token): Observable<any>{
    const params = JSON.stringify(horario);
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'register-horario', params, {headers});

  }

  updateHorario(data, token): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'update-horario/' + data.user, data, {headers: headers});
  }

  deleteHorario(token, id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'delete-horario/' + id, {headers: headers});
  }

}
