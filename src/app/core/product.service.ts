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

  /**
   * Create a new product
   * @param productData - The product object (e.g., { name: 'Product 1', description: 'Some description' })
   */
  createProduct(productData: any): Observable<any> {
    return this._httpclient.post(`${baseUrl}/products`, productData).pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Get a list of all products
   * @param numOfPage - The page number (default is 1)
   */
  allProducts(numOfPage: number = 1): Observable<any> {
    return this._httpclient
      .get(`${baseUrl}/products`, {
        params: { page: numOfPage }
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Get a single product by its ID
   * @param id - The ID of the product to fetch
   */
  getProductById(id: string): Observable<any> {
    return this._httpclient
      .get(`${baseUrl}/products/${id}`)
      .pipe(catchError(this._handelErorrService.logErorr));
  }

    /**
   * Get a single product by its slug
   * @param slug - The slug of the product to fetch
   */
    getProductBySlug(slug: string): Observable<any> {
      return this._httpclient
        .get(`${baseUrl}/products/slug/${slug}`)
        .pipe(catchError(this._handelErorrService.logErorr));
    }

  /**
   * Delete a product by its ID
   * @param id - The ID of the product to delete
   */
  deleteProduct(id: string): Observable<any> {
    console.log('delete product id: ', id);
    return this._httpclient
      .delete(`${baseUrl}/products/${id}`)
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  lengthProducts: BehaviorSubject<number> = new BehaviorSubject(0);
}
