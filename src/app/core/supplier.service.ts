import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { baseUrl } from '../shared/paseApi'; // Assuming this is your base URL
import { Injectable } from '@angular/core';
import { HandelErorrService } from './handel-erorr.service'; // Error handling service

@Injectable({
  providedIn: 'root'
})
export class SuppliersDataService {
  constructor(
    private _httpClient: HttpClient,
    private _handelErorrService: HandelErorrService
  ) {}

  /**
   * Save or update a supplier.
   * @param supplierData - The supplier data to save or update.
   * @returns An observable of the HTTP POST/PUT request.
   */
  saveOrUpdateSupplier(supplierData: any): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/suppliers`, supplierData).pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Fetch all suppliers with pagination support.
   * @param numOfPage - The page number (default is 1).
   * @returns An observable of the HTTP GET request.
   */
  allSuppliers(numOfPage: number = 1): Observable<any> {
    return this._httpClient
      .get(`${baseUrl}/api/suppliers`, {
        params: { page: numOfPage }
      })
      .pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Fetch a supplier by their ID.
   * @param id - The supplier's unique identifier.
   * @returns An observable of the HTTP GET request.
   */
  getSupplierById(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/suppliers/${id}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Fetch a supplier by their slug.
   * @param slug - The supplier's URL-friendly name.
   * @returns An observable of the HTTP GET request.
   */
  getSupplierBySlug(slug: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/api/suppliers/slug/${slug}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * Delete a supplier by their ID.
   * @param id - The supplier's unique identifier.
   * @returns An observable of the HTTP DELETE request.
   */
  deleteSupplier(id: number): Observable<any> {
    return this._httpClient.delete(`${baseUrl}/api/suppliers/${id}`).pipe(catchError(this._handelErorrService.logErorr));
  }

  /**
   * A BehaviorSubject to track the total number of suppliers.
   */
  lengthSuppliers: BehaviorSubject<number> = new BehaviorSubject(0);
}
