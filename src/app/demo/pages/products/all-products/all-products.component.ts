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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SharedModule, MatTableModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  constructor(private _productsDataService: ProductsDataService) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  allProducts: Product[] = [];
  selectedBrandName: string = '';
  selectedCategoryName: any = '';
  uniqeBrands: string[] = [''];
  inputSearch: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  isLoding: boolean = false;
  selectedOption: string = 'all';
  sortBy: string = 'sort';
  ratingNumber: number = 5;
  isClassApplied: boolean = false;
  priceRange: number = 45000;
  productLength: number = 0;

  ngOnInit(): void {
    this.displayAllProducts();
    this._productsDataService.lengthProducts.subscribe({
      next: (length) => {
        this.productLength = length;
      }
    });
  }

  displayAllProducts(): void {
    this._productsDataService.allProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
      }
    });
  }
}
