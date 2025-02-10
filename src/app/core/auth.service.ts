import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { HandelErorrService } from './handel-erorr.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpclient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}

  login(loginData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/api/auth/login`, loginData).pipe(catchError(this._handelErorrService.logErorr));
  }

  signup(signupData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/api/auth/register`, signupData).pipe(catchError(this._handelErorrService.logErorr));
  }

  logout(loginData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/api/auth/logout`, loginData).pipe(catchError(this._handelErorrService.logErorr));
  }
}
