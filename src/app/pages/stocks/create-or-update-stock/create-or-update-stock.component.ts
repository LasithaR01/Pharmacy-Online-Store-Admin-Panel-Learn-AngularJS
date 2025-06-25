// src/app/stocks/create-or-update-stock/create-or-update-stock.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StockService } from "src/app/core/services/stock.service";

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Stocks" },
      { label: this.isEditMode ? "Update Stock" : "Create Stock", active: true },
    ];

    this.stockForm = this.fb.group({
      productId: ["", Validators.required],
      supplierId: ["", Validators.required],
      quantityAdded: ["", [Validators.required, Validators.min(1)]],
      unitCost: ["", [Validators.required, Validators.min(0)]],
      expiryDate: [""],
      batchNumber: [""],
      branchId: ["", Validators.required],
      approvedById: ["", Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.stockId = +id;
        this.isEditMode = true;
        this.loadStock();
      }
    });
  }

  loadStock() {
    this.stockService.getById(this.stockId).subscribe({
      next: (stock) => {
        // Format dates if needed
        this.stockForm.patchValue({
          ...stock,
          expiryDate: stock.expiryDate ? new Date(stock.expiryDate).toISOString().substring(0, 10) : null
        });
      },
      error: () => {
        this.toastr.error("Error loading stock entry");
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
