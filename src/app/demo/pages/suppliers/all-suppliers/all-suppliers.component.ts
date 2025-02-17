import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Supplier } from 'src/app/core/interface/suppliers';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SuppliersDataService } from 'src/app/core/supplier.service';

export interface PeriodicElement {
  id: number;
  name: string;
  contactNumber: string;
  address: string;
}

@Component({
  selector: 'app-all-suppliers',
  standalone: true,
  imports: [SharedModule, MatTableModule],
  templateUrl: './all-suppliers.component.html',
  styleUrl: './all-suppliers.component.scss'
})
export class AllSuppliersComponent implements OnInit {
  constructor(
    private _suppliersDataService: SuppliersDataService, // Service for fetching supplier data
    private router: Router
  ) {}

  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'contactNumber', 'address', 'actions'];

  // Initialize the dataSource without data
  dataSource = new MatTableDataSource<Supplier>([]);
  allSuppliers: Supplier[] = [];

  ngOnInit(): void {
    this.displayAllSuppliers();
  }

  displayAllSuppliers(): void {
    this._suppliersDataService.allSuppliers().subscribe({
      next: (response) => {
        this.allSuppliers = response;
        // Assign the fetched suppliers to the dataSource
        this.dataSource.data = this.allSuppliers;
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      }
    });
  }

  onEditClick(supplier: Supplier): void {
    this.router.navigate(['/suppliers/create', supplier.id]); // Navigate to edit supplier page
  }

  onDeleteClick(supplierId: number): void {
    // if (confirm('Are you sure you want to delete this supplier?')) {
    //   this._suppliersDataService.deleteSupplier(supplierId).subscribe({
    //     next: () => {
    //       // Remove the deleted supplier from the dataSource
    //       this.dataSource.data = this.dataSource.data.filter(
    //         (supplier) => supplier.id !== supplierId
    //       );
    //     },
    //     error: (err) => {
    //       console.error('Error deleting supplier:', err);
    //     }
    //   });
    // }
  }
}
