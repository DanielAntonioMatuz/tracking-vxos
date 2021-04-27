import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class SocketService {
  socket: any;
  uri: string = 'ws://localhost:3800';

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
    this.socket = io(this.uri);
   // this.socket.emit('join', {email: 'user1@example.com'});
  }


  // tslint:disable-next-line:typedef
  listen(eventName: string) {
    return new Observable((subscriber => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    }));
  }

  // tslint:disable-next-line:typedef
  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

}
