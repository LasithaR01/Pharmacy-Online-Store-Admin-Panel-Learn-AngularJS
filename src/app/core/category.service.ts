import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/paseApi';
import { HandelErorrService } from './handel-erorr.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  constructor(
    private _httpclient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}

  saveOrUpdateCategory(categoryData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/api/categories`, categoryData).pipe(catchError(this._handelErorrService.logErorr));
  }

  allCategories(numOfPage: number = 1): Observable<any> {
    return this._httpclient
      .get(`${baseUrl}/api/categories`, {
        params: { page: numOfPage }
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  deleteCategory(id: string) {
    return this._httpclient.delete(`${baseUrl}/categories/${id}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  getCategoryBySlug(slug: string) {
    return this._httpclient.get(`${baseUrl}/api/categories/slug/${slug}`).pipe(catchError(this._handelErorrService.logErorr));
  }
}
