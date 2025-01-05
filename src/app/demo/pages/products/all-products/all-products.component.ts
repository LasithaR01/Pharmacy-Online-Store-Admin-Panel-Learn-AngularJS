import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ProductsDataService } from 'src/app/core/product.service';
import { Product } from 'src/app/core/interface/products';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SharedModule, MatTableModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  constructor(private _productsDataService: ProductsDataService) {}

  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'categoryName'];

  // Initialize the dataSource without data
  dataSource = new MatTableDataSource<Product>([]);

  allProducts: Product[] = [];

  ngOnInit(): void {
    this.displayAllProducts();
  }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response;

        // Assign the fetched products to the dataSource
        this.dataSource.data = this.allProducts;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
