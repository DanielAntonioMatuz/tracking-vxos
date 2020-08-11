import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  // tslint:disable-next-line:typedef
  sendMessage(body) {
    return this._http.post('http://localhost:3800/api/formulario', body);
  }

}
