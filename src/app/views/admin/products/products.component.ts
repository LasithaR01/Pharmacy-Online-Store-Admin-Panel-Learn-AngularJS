import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { catchError } from 'rxjs';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    // Fetching products from the backend
    this.productService
      .getTodoFromApi() // This method likely returns an observable
      .pipe(
        catchError((error) => {
          console.log(error); // Log the error if any
          throw error; // Rethrow the error if you need to handle it later
        })
      )
      .subscribe(
        (todos) => {
          // Assuming 'todos' is the response, you can assign it to `products_from_backend`
          this.products = todos;
          console.log(
            'Received products from backend: ',
            this.products
          );
        },
        (error) => {
          console.error('Error fetching products from backend:', error);
        }
      );

    console.log('products_from_backend: ', this.products);
  }
}
