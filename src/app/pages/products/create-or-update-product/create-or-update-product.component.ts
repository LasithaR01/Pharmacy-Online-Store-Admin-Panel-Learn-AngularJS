// src/app/products/create-or-update-product/create-or-update-product.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/core/services/product.service";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-or-update-product.component.html",
  styleUrls: ["./create-or-update-product.component.scss"],
})
export class CreateOrUpdateProductComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  productId: string | null = null;

  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Product", active: true },
    ];

    this.productForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      costPrice: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      reorderLevel: [0, [Validators.min(0)]],
      expiryDate: [""],
      batchNumber: [""],
      barcode: [""],
      isPrescriptionRequired: [false],
      categoryId: [null],
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get("id");
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.productService.getById(this.productId!).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: () => {
        this.toastr.error("Error loading product");
      },
    });
  }

  onSubmit(): void {
    Object.values(this.productForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.productForm.invalid) return;

    const productData = this.productForm.value;
    // Convert string date to Date object if exists
    if (productData.expiryDate) {
      productData.expiryDate = new Date(productData.expiryDate);
    }

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, productData).subscribe({
        next: () => {
          this.toastr.success("Product updated successfully!", "Success");
          this.router.navigate(["/products/list"]);
        },
        error: () => {
          this.toastr.error("Error updating product!", "Error");
        },
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.toastr.success("Product created successfully!", "Success");
          this.router.navigate(["/products/list"]);
          this.productForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating product!", "Error");
        },
      });
    }
  }
}
