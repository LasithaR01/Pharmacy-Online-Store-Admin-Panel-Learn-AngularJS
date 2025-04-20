import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CategoryService } from "src/app/core/services/category.service";

@Component({
  selector: "app-createcategory",
  templateUrl: "./createcategory.component.html",
  styleUrls: ["./createcategory.component.scss"],
})
export class CreatecategoryComponent {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  categoryForm: FormGroup;
  description: string = "";

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Dashboard" }, { label: "Create Category", active: true }];

    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
    });
  }

  onDescriptionChange(event: any) {
    const data = event.editor.getData();
    this.categoryForm.patchValue({ description: data });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    this.categoryService.create(this.categoryForm.value).subscribe({
      next: () => {
        alert("Category created successfully!");
        this.categoryForm.reset();
      },
      error: (err) => {
        console.error("Error creating category", err);
        alert("Failed to create category.");
      },
    });
  }
}
