import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { Category } from "src/app/core/models/category.models";
import { Product } from "src/app/core/models/product.models";
import { CategoryService } from "src/app/core/services/category.service";
import { ProductService } from "src/app/core/services/product.service";

@Component({
  selector: "app-create-or-update-product",
  templateUrl: "./create-or-update-product.component.html",
  styleUrls: ["./create-or-update-product.component.scss"]
})
export class CreateOrUpdateProductComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @ViewChild('additionalImages') additionalImagesInput!: ElementRef;

  productId: string | null = null;
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  productForm: FormGroup;
  categories: Category[] = [];

  // Image handling properties
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  additionalImagesToUpload: FileList | null = null;
  isUploading = false;
  currentProduct: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Products", active: true }
    ];

    this.productForm = this.fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      costPrice: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      reorderLevel: [0, [Validators.min(0)]],
      expiryDate: [null],
      imageUrl: [""],
      images: [[]],
      batchNumber: ["", [Validators.required, Validators.maxLength(50)]],
      barcode: ["", [Validators.required, Validators.maxLength(50)]],
      isPrescriptionRequired: [false],
      categoryId: [null],
      features: [[]],
      colorVariants: [[]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get("id");
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct();
      }
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.toastr.error("Failed to load categories");
      }
    });
  }

  loadProduct(): void {
    this.productService.getById(this.productId!).subscribe({
      next: (product) => {
        this.currentProduct = product;
        this.productForm.patchValue({
          ...product,
          expiryDate: product.expiryDate ? new Date(product.expiryDate).toISOString().split('T')[0] : null
        });
      },
      error: () => {
        this.toastr.error("Failed to load product");
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file
      if (!file.type.match(/image\/(jpeg|png|gif|webp)/)) {
        this.toastr.error("Only JPEG, PNG, GIF or WEBP images are allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB
        this.toastr.error("Image size should not exceed 2MB");
        return;
      }

      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAdditionalImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.additionalImagesToUpload = input.files;
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.productForm.patchValue({ imageUrl: '' });
  }

  removeAdditionalImage(imageUrl: string): void {
    if (!this.productId) return;

    this.productService.removeImage(this.productId, imageUrl).subscribe({
      next: () => {
        const currentImages = [...this.productForm.value.images];
        const updatedImages = currentImages.filter(img => img !== imageUrl);
        this.productForm.patchValue({ images: updatedImages });
        this.toastr.success("Image removed successfully");
      },
      error: () => {
        this.toastr.error("Failed to remove image");
      }
    });
  }

  uploadAdditionalImages(): void {
    if (!this.productId || !this.additionalImagesToUpload) return;

    this.isUploading = true;
    const uploadObservables = Array.from(this.additionalImagesToUpload).map(file => {
      return this.productService.uploadImage(this.productId!, file);
    });

    // Handle all uploads
    Promise.all(uploadObservables.map(obs => obs.toPromise())).then(results => {
      const newImages = results.map(res => res.imageUrl);
      const currentImages = this.productForm.value.images || [];
      this.productForm.patchValue({
        images: [...currentImages, ...newImages]
      });
      this.additionalImagesToUpload = null;
      this.additionalImagesInput.nativeElement.value = '';
      this.toastr.success("Images uploaded successfully");
    }).catch(error => {
      this.toastr.error("Some images failed to upload");
      console.error("Upload error:", error);
    }).finally(() => {
      this.isUploading = false;
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to trigger validation messages
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.productForm.invalid) {
      this.toastr.warning("Please fill all required fields correctly");
      return;
    }

    if (this.selectedFile) {
      this.submitWithImage();
    } else {
      this.submitWithoutImage();
    }
  }

  private submitWithImage(): void {
    const formData = new FormData();
    const formValue = this.productForm.value;

    // Append all form values
    Object.keys(formValue).forEach(key => {
      if (key !== 'images' && formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    });

    // Append the main image
    formData.append('image', this.selectedFile!);

    // Append additional images if any
    if (formValue.images && formValue.images.length > 0) {
      formValue.images.forEach((img: string) => {
        formData.append('existingImages', img);
      });
    }

    if (this.isEditMode && this.productId) {
      this.productService.updateWithImage(this.productId, formData).subscribe({
        next: () => {
          this.toastr.success("Product updated successfully");
          this.router.navigate(["/products/list"]);
        },
        error: (error) => {
          console.error("Update error:", error);
          this.toastr.error("Failed to update product");
        }
      });
    } else {
      this.productService.createWithImage(formData).subscribe({
        next: () => {
          this.toastr.success("Product created successfully");
          this.router.navigate(["/products/list"]);
        },
        error: (error) => {
          console.error("Create error:", error);
          this.toastr.error("Failed to create product");
        }
      });
    }
  }

  private submitWithoutImage(): void {
    const productData = this.productForm.value;

    // Convert date string to Date object if exists
    if (productData.expiryDate) {
      productData.expiryDate = new Date(productData.expiryDate);
    }

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, productData).subscribe({
        next: () => {
          this.toastr.success("Product updated successfully");
          this.router.navigate(["/products/list"]);
        },
        error: (error) => {
          console.error("Update error:", error);
          this.toastr.error("Failed to update product");
        }
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.toastr.success("Product created successfully");
          this.router.navigate(["/products/list"]);
        },
        error: (error) => {
          console.error("Create error:", error);
          this.toastr.error("Failed to create product");
        }
      });
    }
  }
}
