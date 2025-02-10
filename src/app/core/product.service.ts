import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { Injectable } from '@angular/core';
import { HandelErorrService } from './handel-erorr.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  constructor(
    private _httpclient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}

  saveOrUpdateProduct(productData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/api/products`, productData).pipe(catchError(this._handelErorrService.logErorr));
  }

  allProducts(numOfPage: number = 1): Observable<any> {
    return this._httpclient
      .get(`${baseUrl}/api/products`, {
        params: { page: numOfPage }
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  getProductById(id: string): Observable<any> {
    return this._httpclient.get(`${baseUrl}/api/products/${id}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  getProductBySlug(slug: string): Observable<any> {
    return this._httpclient.get(`${baseUrl}/api/products/slug/${slug}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  deleteProduct(id: string): Observable<any> {
    return this._httpclient.delete(`${baseUrl}/products/${id}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);
}
