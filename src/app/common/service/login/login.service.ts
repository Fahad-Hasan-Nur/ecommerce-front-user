import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_API } from '../../constants/api.constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  public login(data) : Observable<any>{
    return this._http.post(LOGIN_API.LOGIN,data);
  }
  // public testGreetingService():Observable<any>{
  //   return this._http.get(GREETING_SERVICE);
  // }
}
