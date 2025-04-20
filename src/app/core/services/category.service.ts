import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { Category } from "../models/category.models";

@Injectable({ providedIn: "root" })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, {
      headers,
    });
  }

  create(category: { name: string; description: string }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${environment.apiUrl}/categories`, category, { headers });
  }

  delete(categoryId: number) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.delete(`${environment.apiUrl}/categories/${categoryId}`, { headers });
  }
  
}
