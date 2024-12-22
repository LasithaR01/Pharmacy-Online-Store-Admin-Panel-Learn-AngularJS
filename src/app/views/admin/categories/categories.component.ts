import { Component, OnInit } from '@angular/core';
import { Category } from './models/category.model';
import { CategoryService } from './services/category.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  // Column definitions
  columns = [
    { field: 'code', header: 'Product Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
  ];

  // Table data
  products = [
    {
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
    },
    {
      code: 'nvklal433',
      name: 'Black Watch',
      category: 'Accessories',
      quantity: 61,
    },
    { code: 'zz21er5kl', name: 'Blue Band', category: 'Fitness', quantity: 34 },
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Fetching products from the backend
    this.categoryService
      .getCategories() // This method likely returns an observable
      .pipe(
        catchError((error) => {
          console.log(error); // Log the error if any
          throw error; // Rethrow the error if you need to handle it later
        })
      )
      .subscribe(
        (todos) => {
          // Assuming 'todos' is the response, you can assign it to `products_from_backend`
          this.categories = todos;
          console.log('Received products from backend: ', this.categories);
        },
        (error) => {
          console.error('Error fetching products from backend:', error);
        }
      );

    console.log('products_from_backend: ', this.categories);
  }
}
