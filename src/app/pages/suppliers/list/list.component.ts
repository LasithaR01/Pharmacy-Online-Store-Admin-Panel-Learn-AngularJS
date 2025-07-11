import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Supplier } from "src/app/core/models/supplier.models";
import { SupplierService } from "src/app/core/services/supplier.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private supplierService: SupplierService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Branches", active: true },
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
        console.error("Failed to load branches", err);
        this.toastr.error("Failed to load branches");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredSuppliers = [...this.suppliers];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    // this.filteredSuppliers = this.suppliers.filter(supplier =>
    //   supplier.name.toLowerCase().includes(term) ||
    //   (supplier.id && branch.location.toLowerCase().includes(term)) ||
    //   (branch.contactNumber && branch.contactNumber.toLowerCase().includes(term))
    // );
  }

  edit(id: string): void {
    this.router.navigate([`/suppliers/update`, id]);
  }

  showDeleteModal(id: string): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.supplierService.remove(this.deletId).subscribe({
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
