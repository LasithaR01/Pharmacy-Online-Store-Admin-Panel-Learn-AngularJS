import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { BranchService } from "src/app/core/services/branch.service";
import { SupplierService } from "src/app/core/services/supplier.service";

@Component({
  selector: "app-create-branch",
  templateUrl: "./create-or-update-supplier.component.html",
  styleUrls: ["./create-or-update-supplier.component.scss"],
})
export class CreateOrUpdateSupplierComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  branchId: string | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  branchForm: FormGroup;
  description: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Branch", active: true },
    ];

    this.branchForm = this.fb.group({
      companyName: ["", Validators.required],
      address: ["", Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.branchId = params.get("id");
      if (this.branchId) {
        this.isEditMode = true;
        this.loadBranch();
      }
    });
  }

  loadBranch() {
    this.supplierService.getById(this.branchId!).subscribe({
      next: (branch) => {
        this.branchForm.patchValue(branch);
      },
      error: () => {
        this.toastr.error("Error loading branch");
      },
    });
  }

  onDescriptionChange(event: any) {
    const data = event.editor.getData();
    this.branchForm.patchValue({ description: data });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.branchForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.branchForm.invalid) return;
    if (this.isEditMode && this.branchId) {
      this.supplierService
        .update(this.branchId, this.branchForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("Supplier updated successfully!", "Success");
            this.router.navigate(["/suppliers/list"]);
          },
          error: () => {
            this.toastr.error("Error updating branch!", "Error");
          },
        });
    } else {
      this.supplierService.create(this.branchForm.value).subscribe({
        next: () => {
          this.toastr.success("Supplier created successfully!", "Success");
          this.router.navigate(["/suppliers/list"]);
          this.branchForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating branch!", "Error");
        },
      });
    }
  }
}
