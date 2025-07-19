// src/app/core/services/category.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.models";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class CategoryService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<Category[]>("categories");
  }

  getById(id: string) {
    return this.get<Category>(`categories/${id}`);
  }

  create(category: Partial<Category> | FormData) {
    return this.post("categories", category);
  }

  update(id: string, category: Partial<Category> | FormData) {
    return this.put(`categories/${id}`, category);
  }

  remove(id: string) {
    return this.delete(`categories/${id}`);
  }

  getChildren(parentId: string) {
    return this.get<Category[]>(`categories/${parentId}/children`);
  }

  search(name: string) {
    // @ts-ignore
    return this.get<Category[]>("categories/search", { params: { name } });
  }
}
