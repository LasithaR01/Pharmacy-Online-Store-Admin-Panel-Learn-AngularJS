// src/app/core/services/base.service.ts

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export abstract class BaseService {
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  /**
   * Returns auth headers with Bearer token
   */
  protected get authHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = currentUser?.accessToken;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * GET request with auth
   */
  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: this.authHeaders,
    });
  }

  /**
   * POST request with auth
   */
  protected post<T>(url: string, body: any): Observable<T> {
    const isFormData = body instanceof FormData;
          console.log('isFormData: ', isFormData)

    const headers = isFormData
      ? this.authHeaders
      : this.authHeaders.set("Content-Type", "application/json");

      console.log('headers: ', headers)

    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {
      headers,
      responseType: "json",
    });
  }

  /**
   * PUT request with auth
   */
  protected put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.authHeaders,
    });
  }

  /**
   * DELETE request with auth
   */
  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {
      headers: this.authHeaders,
    });
  }

  /**
   * PATCH request with auth
   */
  protected patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.authHeaders,
    });
  }
}
