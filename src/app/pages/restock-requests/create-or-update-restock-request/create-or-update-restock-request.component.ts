// src/app/restock-requests/create-or-update-restock-request/create-or-update-restock-request.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Branch } from "src/app/core/models/branch.models";
import { Product } from "src/app/core/models/product.models";
import {
  RestockRequest,
  RestockStatus,
} from "src/app/core/models/restock-request.models";
import { Supplier } from "src/app/core/models/supplier.models";
import { BranchService } from "src/app/core/services/branch.service";
import { ProductService } from "src/app/core/services/product.service";
import { RestockRequestService } from "src/app/core/services/restock-request.service";
import { SupplierService } from "src/app/core/services/supplier.service";

@Component({
  selector: "app-create-or-update-restock-request",
  templateUrl: "./create-or-update-restock-request.component.html",
  styleUrls: ["./create-or-update-restock-request.component.scss"],
})
export class CreateOrUpdateRestockRequestComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  requestId: number | null = null;
  RestockStatus = RestockStatus;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  requestForm: FormGroup;
  suppliers: Supplier[] = [];
  branches: Branch[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restockRequestService: RestockRequestService,
    public toastr: ToastrService,
    public supplierService: SupplierService,
    public branchService: BranchService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      {
        label: this.isEditMode ? "Update Request" : "Create Request",
        active: true,
      },
    ];

    this.requestForm = this.fb.group({
      productId: ["", Validators.required],
      branchId: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.min(1)]],
      status: [RestockStatus.PENDING, Validators.required],
      supplierId: [""],
      notes: [""],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.requestId = +id;
        this.isEditMode = true;
        this.loadRequest();
      }
    });

    this.loadSuppliers();
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: () => {
        this.toastr.error("Error loading branches");
      },
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        this.toastr.error("Error loading products");
      },
    });
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
      error: () => {
        this.toastr.error("Error loading suppliers");
      },
    });
  }

  loadRequest() {
    if (this.requestId) {
      this.restockRequestService.getById(this.requestId).subscribe({
        next: (request) => {
          this.requestForm.patchValue(request);
        },
        error: () => {
          this.toastr.error("Error loading restock request");
        },
      });
    }
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.requestForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.requestForm.invalid) return;

    const requestData = this.requestForm.value;

    if (this.isEditMode && this.requestId) {
      this.restockRequestService.update(this.requestId, requestData).subscribe({
        next: () => {
          this.toastr.success("Request updated successfully!", "Success");
          this.router.navigate(["/restock-requests/list"]);
        },
        error: () => {
          this.toastr.error("Error updating request!", "Error");
        },
      });
    } else {
      this.restockRequestService.create(requestData).subscribe({
        next: () => {
          this.toastr.success("Request created successfully!", "Success");
          this.router.navigate(["/restock-requests/list"]);
          this.requestForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating request!", "Error");
        },
      });
    }
  }
}
