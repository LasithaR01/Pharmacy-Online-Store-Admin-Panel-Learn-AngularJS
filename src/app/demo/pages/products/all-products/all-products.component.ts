import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Product } from 'src/app/core/interface/products';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

// import { ModalComponent } from 'src/app/theme/shared/components/modal/modal.component';
import { Router } from '@angular/router';
import { ProductsDataService } from 'src/app/core/product.service';

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
  constructor(
    private _productsDataService: ProductsDataService,
    private router: Router
  ) {}
  // readonly dialog = inject(MatDialog);

  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'slug', 'categoryName', 'actions'];

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

  onEditClick(product: Product): void {
    this.router.navigate(['/products/create', product.slug]);
  }

  onButtonClick(element: Product): void {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   data: { productId: element.id }
    // });
  }
}
