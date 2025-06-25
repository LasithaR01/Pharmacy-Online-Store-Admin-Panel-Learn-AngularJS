// src/app/pages/categories/create-or-update/create-or-update.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "src/app/core/services/category.service";
import { Category } from "src/app/core/models/category.models";

@Component({
  selector: "app-create-or-update-category",
  templateUrl: "./create-or-update.component.html",
  styleUrls: ["./create-or-update.component.scss"],
})
export class CreateOrUpdateCategoryComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  categoryId: string | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  categoryForm: FormGroup;
  parentCategories: Category[] = [];

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
      },
      error: () => {
        this.toastr.error("Error loading category");
      },
    });
  }

  onSubmit(): void {
    Object.values(this.categoryForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.categoryForm.invalid) return;

    const formValue = this.categoryForm.value;
    if (formValue.parentId === '') {
      formValue.parentId = null;
    }

    if (this.isEditMode && this.categoryId) {
      this.categoryService.update(this.categoryId, formValue).subscribe({
        next: () => {
          this.toastr.success("Category updated successfully!", "Success");
          this.router.navigate(["/categories/list"]);
        },
        error: () => {
          this.toastr.error("Error updating category!", "Error");
        },
      });
    } else {
      this.categoryService.create(formValue).subscribe({
        next: () => {
          this.toastr.success("Category created successfully!", "Success");
          this.router.navigate(["/categories/list"]);
          this.categoryForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating category!", "Error");
        },
      });
    }
  }
}
