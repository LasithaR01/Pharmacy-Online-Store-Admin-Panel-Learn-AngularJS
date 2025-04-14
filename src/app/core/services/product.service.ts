import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { Product } from "../models/product.models";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Product[]>(`${environment.apiUrl}/products`, {
      headers,
    });
  }
}
