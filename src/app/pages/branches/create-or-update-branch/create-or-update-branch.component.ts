import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { BranchService } from "src/app/core/services/branch.service";

@Component({
  selector: "app-create-branch",
  templateUrl: "./create-or-update-branch.component.html",
  styleUrls: ["./create-or-update-branch.component.scss"],
})
export class CreateOrUpdateBranchComponent implements OnInit {
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
    private branchService: BranchService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Branch", active: true },
    ];

    this.branchForm = this.fb.group({
      name: ["", Validators.required],
      location: ["", Validators.required],
      contactNumber: ["", Validators.required],
      openingHours: ["", Validators.required],
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
    this.branchService.getById(this.branchId!).subscribe({
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
      this.branchService
        .update(this.branchId, this.branchForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("Branch updated successfully!", "Success");
            this.router.navigate(["/branches/list"]);
          },
          error: () => {
            this.toastr.error("Error updating branch!", "Error");
          },
        });
    } else {
      this.branchService.create(this.branchForm.value).subscribe({
        next: () => {
          this.toastr.success("Branch created successfully!", "Success");
          this.router.navigate(["/branches/list"]);
          this.branchForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating branch!", "Error");
        },
      });
    }
  }
}
