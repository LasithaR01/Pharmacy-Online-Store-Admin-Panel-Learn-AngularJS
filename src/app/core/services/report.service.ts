// src/app/core/services/product.service.ts
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ReportService {
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

  exportLowStock(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/products/export/low-stock`, {
      headers: this.authHeaders,
      responseType: "blob",
    });
  }

  expiringSoonProducts(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/products/export/expiring`, {
      headers: this.authHeaders,
      responseType: "blob",
    });
  }
}
