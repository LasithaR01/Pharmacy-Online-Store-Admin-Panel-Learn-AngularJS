import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { TableDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableDirective, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  products_from_backend: Product[] = [];

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
          this.products_from_backend = todos;
          console.log(
            'Received products from backend: ',
            this.products_from_backend
          );
        },
        (error) => {
          console.error('Error fetching products from backend:', error);
        }
      );

    console.log('products: ', this.products);
    console.log('products_from_backend: ', this.products_from_backend);
  }
}
