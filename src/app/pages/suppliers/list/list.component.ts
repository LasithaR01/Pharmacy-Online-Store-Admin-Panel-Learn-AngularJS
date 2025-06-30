// src/app/pages/suppliers/list/list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/core/models/supplier.models';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: any;

  constructor(
    private supplierService: SupplierService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Suppliers", active: true },
    ];

    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.filteredSuppliers = [...this.suppliers];
      },
      error: (err) => {
        console.error("Failed to load suppliers", err);
        this.toastr.error("Failed to load suppliers");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredSuppliers = [...this.suppliers];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredSuppliers = this.suppliers.filter(supplier =>
      supplier.companyName.toLowerCase().includes(term) ||
      (supplier.address && supplier.address.toLowerCase().includes(term)) ||
      (supplier.userEmail && supplier.userEmail.toLowerCase().includes(term)) ||
      (supplier.taxId && supplier.taxId.toLowerCase().includes(term))
    );
  }

  edit(id: number): void {
    this.router.navigate(['/suppliers/update', id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.supplierService.remove(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Supplier deleted successfully!", "Success");
        this.loadSuppliers();
      },
      error: () => {
        this.toastr.error("Error deleting supplier");
      },
    });
    this.removeItemModal?.hide();
  }
}
