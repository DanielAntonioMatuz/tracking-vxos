import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()

export class UploadService {

  constructor(private _http: HttpClient) {

  }

  uploadImage(value): Observable<any>{
    let data = value;
    return this._http.post('https://api.cloudinary.com/v1_1/vxosplatform/image/upload', data);
  }

  getGeolocation(): Observable<any> {
    return this._http.get('https://geolocation-db.com/json/');
  }

}

