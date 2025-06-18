import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseService {
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected get authHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = currentUser?.accessToken;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  protected get<T>(url: string) {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: this.authHeaders,
    });
  }

  protected post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.authHeaders,
    });
  }

  protected put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.authHeaders,
    });
  }

  protected delete<T>(url: string) {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {
      headers: this.authHeaders,
    });
  }
}
