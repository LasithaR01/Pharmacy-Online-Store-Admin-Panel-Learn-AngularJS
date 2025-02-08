import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryDataService } from 'src/app/core/category.service';
import { Category } from 'src/app/core/interface/products';
import { ModalComponent } from 'src/app/theme/shared/components/modal/modal.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [SharedModule, MatTableModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent {
  constructor(private _categoryDataService: CategoryDataService) {}
  readonly dialog = inject(MatDialog);

  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'slug', 'actions'];

  // Initialize the dataSource without data
  dataSource = new MatTableDataSource<Category>([]);

  allProducts: Category[] = [];

  ngOnInit(): void {
    this.displayAllProducts();
  }

  displayAllProducts(): void {
    this._categoryDataService.allCategories().subscribe({
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

  // Open Modal and Handle Delete
  onButtonClick(element: Category): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title: 'Delete', message: 'Are you sure you want to delete this category?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user confirmed deletion
        this.deleteCategory(element.id);
      }
    });
  }

  // Perform Delete and Refresh Table
  deleteCategory(categoryId: string): void {
    this._categoryDataService.deleteCategory(categoryId).subscribe({
      next: () => {
        console.log(`Category ${categoryId} deleted successfully`);
        this.displayAllProducts(); // Refresh the list
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}
