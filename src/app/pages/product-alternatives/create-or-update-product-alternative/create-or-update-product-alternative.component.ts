// src/app/product-alternatives/create-or-update-product-alternative/create-or-update-product-alternative.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProductAlternative } from "src/app/core/models/product-alternative.models";
import { ProductAlternativeService } from "src/app/core/services/product-alternative.service";

@Component({
  selector: "app-create-product-alternative",
  templateUrl: "./create-or-update-product-alternative.component.html",
  styleUrls: ["./create-or-update-product-alternative.component.scss"],
})
export class CreateOrUpdateProductAlternativeComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  alternativeId: number | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  alternativeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productAlternativeService: ProductAlternativeService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Product Alternative", active: true },
    ];

    this.alternativeForm = this.fb.group({
      productId: ["", Validators.required],
      alternativeProductId: ["", Validators.required],
      reason: [""],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.alternativeId = +id;
        this.isEditMode = true;
        this.loadAlternative();
      }
    });
  }

  loadAlternative() {
    this.productAlternativeService.getById(this.alternativeId!).subscribe({
      next: (alternative) => {
        this.alternativeForm.patchValue(alternative);
      },
      error: () => {
        this.toastr.error("Error loading product alternative");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.alternativeForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.alternativeForm.invalid) return;

    const formData = this.alternativeForm.value;

    if (this.isEditMode && this.alternativeId) {
      this.productAlternativeService
        .update(this.alternativeId, formData)
        .subscribe({
          next: () => {
            this.toastr.success("Product alternative updated successfully!", "Success");
            this.router.navigate(["/product-alternatives/list"]);
          },
          error: () => {
            this.toastr.error("Error updating product alternative!", "Error");
          },
        });
    } else {
      this.productAlternativeService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Product alternative created successfully!", "Success");
          this.router.navigate(["/product-alternatives/list"]);
          this.alternativeForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating product alternative!", "Error");
        },
      });
    }
  }
}
