// src/app/core/services/product.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.models";
import { BaseService } from "./base.service";
import {Observable} from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Product[]>("products");
  }

  getById(id: string) {
    return this.get<Product>(`products/${id}`);
  }

  getByBarcode(barcode: string) {
    return this.get<Product>(`products/barcode/${barcode}`);
  }

  create(product: Partial<Product>) {
    return this.post("products", product);
  }

  update(id: string, product: Partial<Product>) {
    return this.put(`products/${id}`, product);
  }

  remove(id: string) {
    return this.delete(`products/${id}`);
  }

  getByCategory(categoryId: string) {
    return this.get<Product[]>(`products/category/${categoryId}`);
  }

  search(name: string) {
    return this.get<Product[]>(`products/search?name=${name}`);
  }

  getLowStock() {
    return this.get<Product[]>("products/low-stock");
  }

  getExpiring() {
    return this.get<Product[]>("products/expiring");
  }

  createWithImage(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}products/with-image`, formData);
  }

  updateWithImage(id: string, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}products/${id}/with-image`, formData);
  }

  uploadImage(productId: string, image: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ imageUrl: string }>(
      `${this.baseUrl}products/${productId}/upload-image`,
      formData
    );
  }

  removeImage(productId: string, imageUrl: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}products/${productId}/images`,
      { body: { imageUrl } }
    );
  }
}
