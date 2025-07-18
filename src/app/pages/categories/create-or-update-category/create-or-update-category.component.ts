import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "src/app/core/services/category.service";
import { Category } from "src/app/core/models/category.models";

@Component({
  selector: "app-create-or-update-category-branch-category",
  templateUrl: "./create-or-update-category.component.html",
  styleUrls: ["./create-or-update-category.component.scss"],
})
export class CreateOrUpdateCategoryComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  categoryId: string | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  categoryForm: FormGroup;
  parentCategories: Category[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  currentImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Categories", active: true },
    ];

    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      parentId: [null],
      imageUrl: [""]
    });

    this.loadParentCategories();

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get("id");
      if (this.categoryId) {
        this.isEditMode = true;
        this.loadCategory();
      }
    });
  }

  loadParentCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.parentCategories = categories;
      },
      error: () => {
        this.toastr.error("Error loading parent categories");
      },
    });
  }

  loadCategory() {
    this.categoryService.getById(this.categoryId!).subscribe({
      next: (category) => {
        this.categoryForm.patchValue(category);
        this.currentImageUrl = category.imageUrl;
      },
      error: () => {
        this.toastr.error("Error loading category");
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        this.toastr.error('Only image files are allowed!');
        return;
      }
      if (file.size > 2097152) { // 2MB
        this.toastr.error('File size should not exceed 2MB!');
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

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.currentImageUrl = null;
    this.categoryForm.patchValue({ imageUrl: '' });
  }

  onSubmit(): void {
    Object.values(this.categoryForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.categoryForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description || '');
    formData.append('parentId', this.categoryForm.value.parentId || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else if (this.currentImageUrl) {
      formData.append('imageUrl', this.currentImageUrl);
    }

    if (this.isEditMode && this.categoryId) {
      this.categoryService.updateWithImage(this.categoryId, formData).subscribe({
        next: () => {
          this.toastr.success("Category updated successfully!", "Success");
          this.router.navigate(["/categories/list"]);
        },
        error: () => {
          this.toastr.error("Error updating category!", "Error");
        },
      });
    } else {
      this.categoryService.createWithImage(formData).subscribe({
        next: () => {
          this.toastr.success("Category created successfully!", "Success");
          this.router.navigate(["/categories/list"]);
          this.categoryForm.reset();
          this.imagePreview = null;
          this.selectedFile = null;
        },
        error: () => {
          this.toastr.error("Error creating category!", "Error");
        },
      });
    }
  }
}
