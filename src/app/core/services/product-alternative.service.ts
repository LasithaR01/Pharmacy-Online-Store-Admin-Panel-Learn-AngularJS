// src/app/core/services/product-alternative.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductAlternative } from "../models/product-alternative.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class ProductAlternativeService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<ProductAlternative[]>("product-alternatives");
  }

  getById(id: number) {
    return this.get<ProductAlternative>(`product-alternatives/${id}`);
  }

  getForProduct(productId: number) {
    return this.get<ProductAlternative[]>(`product-alternatives/product/${productId}`);
  }

  getRecommended(productId: number) {
    return this.get<ProductAlternative[]>(`product-alternatives/recommendations/${productId}`);
  }

  create(alternative: Partial<ProductAlternative>) {
    return this.post("product-alternatives", alternative);
  }

  update(id: number, alternative: Partial<ProductAlternative>) {
    return this.put(`product-alternatives/${id}`, alternative);
  }

  remove(id: number) {
    return this.delete(`product-alternatives/${id}`);
  }
}
