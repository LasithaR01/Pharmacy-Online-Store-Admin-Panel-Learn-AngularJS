import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class CategoryService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Category[]> {
    return this.get<Category[]>("categories");
  }

  getById(id: string): Observable<Category> {
    return this.get<Category>(`categories/${id}`);
  }

  create(category: Partial<Category>): Observable<Category> {
    return this.post("categories", category);
  }

  update(id: string, category: Partial<Category>): Observable<Category> {
    return this.put(`categories/${id}`, category);
  }

  remove(id: string): Observable<void> {
    return this.delete(`categories/${id}`);
  }

  getChildren(parentId: string): Observable<Category[]> {
    return this.get<Category[]>(`categories/${parentId}/children`);
  }

  // search(name: string): Observable<Category[]> {
  //   return this.get<Category[]>("categories/search", { params: { name } });
  // }

  // Image upload methods
  createWithImage(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}categories/with-image`, formData);
  }

  updateWithImage(id: string, formData: FormData): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}categories/${id}/with-image`, formData);
  }

  uploadImage(categoryId: string, image: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ imageUrl: string }>(
      `${this.baseUrl}categories/${categoryId}/upload-image`,
      formData
    );
  }

  removeImage(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}categories/${categoryId}/image`);
  }
}
