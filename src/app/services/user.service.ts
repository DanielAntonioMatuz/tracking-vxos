import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {User} from '../models/user';
import {AdminUser} from '../models/adminUser';


// @ts-ignore
@Injectable()
export class UserService {

  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getUser(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'usuario/' + id, {headers});
  }

  getUserService(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'usuario-service/' + id, {headers});
  }

  signup(user, gettoken = null): Observable<any>{
    if (gettoken != null) {
      user.gettoken = gettoken;
    }

    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, {headers});
  }

  search(email, token): Observable<any>{
    const params = JSON.stringify({email: email});
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'search', email, {headers});
  }

  // tslint:disable-next-line:typedef
  getIdentity(){
    const identity = JSON.parse(localStorage.getItem('identity'));
    // tslint:disable-next-line:triple-equals
    if (identity != 'undefined'){
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  get_user(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'usuarios', {headers});
  }

  getTopService(token, page): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'top-service/' + page, {headers});
  }

  getUsersService(token): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'usuarios-service', {headers});
  }

  // tslint:disable-next-line:typedef
  getToken(){
    const token = localStorage.getItem('token');

    // tslint:disable-next-line:triple-equals
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  registerUser(user: User, token): Observable<any>{


    const params = JSON.stringify(user);
    console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.post(this.url + 'register', params, {headers});

  }

  update_config(data): Observable<any> {
    console.log(data.name);

    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('email', data.email);
    fd.append('estadoPedido', data.estadoPedido);
    fd.append('act1', data.act1);
    fd.append('act2', data.act2);
    fd.append('act3', data.act3);
    fd.append('act4', data.act4);
    fd.append('vigencia', data.vigencia);
    fd.append('fechaOrden', data.fechaOrden);
    fd.append('referencia', data.referencia);
    fd.append('pedido', data.pedido);


    return this._http.put(this.url + 'usuario/editar/' + data._id, fd);
  }

  // tslint:disable-next-line:typedef variable-name
  register(user: User): Observable<any>{
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register', params, {headers});
  }

  registerAdmin(user: AdminUser): Observable<any>{
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register-service', params, {headers});
  }
}
