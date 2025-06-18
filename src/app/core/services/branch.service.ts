import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Branch } from "../models/branch.models";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class BranchService {
  constructor(private http: HttpClient) {}

  getAll() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Branch[]>(`${environment.apiUrl}/branches`, {
      headers,
    });
  }

  create(category: { name: string; description: string }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${environment.apiUrl}/branches`, category, { headers });
  }

  delete(categoryId: number) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.accessToken;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.delete(`${environment.apiUrl}/branches/${categoryId}`, { headers });
  }
  
}
