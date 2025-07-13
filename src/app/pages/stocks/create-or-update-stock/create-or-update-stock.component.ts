// src/app/stocks/create-or-update-stock/create-or-update-stock.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Branch } from "src/app/core/models/branch.models";
import { Category } from "src/app/core/models/category.models";
import { Product } from "src/app/core/models/product.models";
import { Supplier } from "src/app/core/models/supplier.models";
import { BranchService } from "src/app/core/services/branch.service";
import { CategoryService } from "src/app/core/services/category.service";
import { ProductService } from "src/app/core/services/product.service";
import { StockService } from "src/app/core/services/stock.service";
import { SupplierService } from "src/app/core/services/supplier.service";

@Component({
  selector: "app-create-stock",
  templateUrl: "./create-or-update-stock.component.html",
  styleUrls: ["./create-or-update-stock.component.scss"],
})
export class CreateOrUpdateStockComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  stockId: number;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  stockForm: FormGroup;
  products: Product[] = [];
  suppliers: Supplier[] = [];
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    public toastr: ToastrService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Stocks" },
      {
        label: this.isEditMode ? "Update Stock" : "Create Stock",
        active: true,
      },
    ];

    this.stockForm = this.fb.group({
      productId: ["", Validators.required],
      supplierId: ["", Validators.required],
      quantityAdded: ["", [Validators.required, Validators.min(1)]],
      unitCost: ["", [Validators.required, Validators.min(0)]],
      expiryDate: [""],
      batchNumber: [""],
      branchId: ["", Validators.required],
      // approvedById: ["", Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.stockId = +id;
        this.isEditMode = true;
        this.loadStock();
      }
    });

    this.loadProducts();
    this.loadSuppliers();
    this.loadBraches();
  }

  loadStock() {
    this.stockService.getById(this.stockId).subscribe({
      next: (stock) => {
        // Format dates if needed
        this.stockForm.patchValue({
          ...stock,
          expiryDate: stock.expiryDate
            ? new Date(stock.expiryDate).toISOString().substring(0, 10)
            : null,
        });
      },
      error: () => {
        this.toastr.error("Error loading stock entry");
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
        this.toastr.error("Error loading categories");
      },
    });
  }

  loadBraches() {
    this.branchService.getAll().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: () => {
        this.toastr.error("Error loading branches");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.stockForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.stockForm.invalid) return;

    const formData = this.stockForm.value;

    if (this.isEditMode && this.stockId) {
      this.stockService.update(this.stockId, formData).subscribe({
        next: () => {
          this.toastr.success("Stock updated successfully!", "Success");
          this.router.navigate(["/stocks/list"]);
        },
        error: () => {
          this.toastr.error("Error updating stock entry!", "Error");
        },
      });
    } else {
      this.stockService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Stock created successfully!", "Success");
          this.router.navigate(["/stocks/list"]);
          this.stockForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating stock entry!", "Error");
        },
      });
    }
  }
}
