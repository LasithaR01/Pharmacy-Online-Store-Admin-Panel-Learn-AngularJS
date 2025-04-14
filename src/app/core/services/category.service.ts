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

    console.log('token: ', token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, {
      headers,
    });
  }
}
