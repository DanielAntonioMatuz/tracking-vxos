import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Empresa} from '../models/empresa';


// @ts-ignore
@Injectable()
export class EmpresaConnectionsService {

  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getEmpresa(id, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'empresa/' + id, {headers});
  }

  getEmpresas(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'get-empresas', {headers});
  }

  getEmpresaPublic(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'public-empresas/' + id, {headers});
  }

  registerEmpresa(empresa: Empresa, token): Observable<any>{


    const params = JSON.stringify(empresa);
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'register-empresa', params, {headers});

  }

  search(id, nombre): Observable<any>{
    const params = JSON.stringify({nombre: nombre, user: id});
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'search-empresa', {nombre, id}, {headers});
  }

  getPaginationEmpresas(page): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'pagination-empresas/' + page, {headers});
  }

  updateEmpresa(data, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'update-empresa/' + data._id, data, {headers: headers});
  }

  deleteEmpresa(token, id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'delete-empresa/' + id, {headers: headers});
  }

}
