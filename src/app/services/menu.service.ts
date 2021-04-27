import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Menu} from '../models/menu';


// @ts-ignore
@Injectable()
export class MenuService {

  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getMenu(id, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'menu/' + id, {headers});
  }

  getMenuId(id, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'id-menu/' + id, {headers});
  }

  getMenuPublic(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'menu-public/' + id, {headers});
  }

  registerMenu(menu: Menu, token): Observable<any>{


    const params = JSON.stringify(menu);
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'register-menu', params, {headers});

  }

  search(id, nombre): Observable<any>{
    const params = JSON.stringify({nombre: nombre, user: id});
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'search-menu', {nombre, id}, {headers});
  }

  updateMenu(data, token): Observable<any> {
   /* const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('detalles', data.detalles);
    fd.append('empresa', data.empresa);
    fd.append('fecha', data.fecha);
    fd.append('imagen', data.imagen);
    fd.append('anexos', data.anexos);
    fd.append('estatus', data.estatus);
    fd.append('user', data.user);*/
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'update-menu/' + data._id, data, {headers: headers});
  }

  deleteMenu(token, id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'delete-menu/' + id, {headers: headers});
  }

}
