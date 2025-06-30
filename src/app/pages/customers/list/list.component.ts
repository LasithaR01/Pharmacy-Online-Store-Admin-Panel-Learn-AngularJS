// src/app/customers/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Customer } from "src/app/core/models/customer.models";
import { CustomerService } from "src/app/core/services/customer.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private customerService: CustomerService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Customers", active: true },
    ];

    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = [...this.customers];
      },
      error: (err) => {
        console.error("Failed to load customers", err);
        this.toastr.error("Failed to load customers");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      (customer.userName && customer.userName.toLowerCase().includes(term)) ||
      (customer.userEmail && customer.userEmail.toLowerCase().includes(term)) ||
      (customer.address && customer.address.toLowerCase().includes(term)) ||
      (customer.userContactNumber && customer.userContactNumber.toLowerCase().includes(term))
    );
  }

  edit(id: number): void {
    this.router.navigate(['/customers/update', id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.customerService.remove(this.deleteId).subscribe({  // Changed from delete() to remove()
      next: () => {
        this.toastr.success("Customer deleted successfully!", "Success");
        this.loadCustomers();
      },
      error: () => {
        this.toastr.error("Error deleting customer");
      },
    });
    this.removeItemModal?.hide();
  }
}
