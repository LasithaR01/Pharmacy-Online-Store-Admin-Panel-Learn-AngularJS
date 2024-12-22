import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://your-api-url.com/get_all_products'; // Replace with your API endpoint

  http = inject(HttpClient);

  constructor() {}

  // private products: Product[] = [
  //   { id: 1, name: 'Laptop', price: 1500, category: 'Electronics' },
  //   { id: 2, name: 'Chair', price: 100, category: 'Furniture' },
  //   { id: 3, name: 'Phone', price: 800, category: 'Electronics' },
  //   { id: 4, name: 'Shoes', price: 120, category: 'Clothing' },
  // ];

  // getProducts(): Product[] {
  //   return this.products;
  // }

  getCategories() {
    const url = 'http://127.0.0.1:8080/categories';
    return this.http.get<Array<Category>>(url);
  }

  // getAllProducts(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
}
