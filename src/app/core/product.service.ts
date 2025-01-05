import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { HandelErorrService } from './handel-erorr.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  constructor(
    private _httpclient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}

  allProducts(numOfPage: number = 1): Observable<any> {
    return this._httpclient
      .get(`${baseUrl}/products`, {
        params: { page: numOfPage }
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);
}
