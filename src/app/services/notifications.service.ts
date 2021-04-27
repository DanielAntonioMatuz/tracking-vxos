import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {User} from '../models/user';
import {AdminUser} from '../models/adminUser';


// @ts-ignore
@Injectable()
export class NotificationsService {

  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getNotifications(id, token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'notifications/'+id ,{headers});
  }

  search(email): Observable<any>{
    const params = JSON.stringify({email: email});
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'search', email, {headers});
  }

  updateNotifications(data, token): Observable<any> {
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('detalles', data.detalles);
    fd.append('empresa', data.empresa);
    fd.append('fecha', data.fecha);
    fd.append('imagen', data.imagen);
    fd.append('anexos', data.anexos);
    fd.append('estatus', data.estatus);
    fd.append('user', data.user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'update-notifications/' + data._id, data, {headers: headers});
  }

  deleteNotifications(token, id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'notifications-delete/' + id, {headers: headers});
  }

}
