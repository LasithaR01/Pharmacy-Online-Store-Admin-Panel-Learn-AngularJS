import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { BranchService } from "src/app/core/services/branch.service";

@Component({
  selector: "app-create-branch",
  templateUrl: "./create-branch.component.html",
  styleUrls: ["./create-branch.component.scss"],
})
export class CreateBranchComponent {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  branchForm: FormGroup;
  description: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
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

    this.branchService.create(this.branchForm.value).subscribe({
      next: () => {
        this.toastr.success("Branch created successfully!", "Bootstrap");

        // ✅ Redirect to branch list (adjust the path if needed)
        this.router.navigate(["/branches/list"]);

        this.branchForm.reset();
      },
      error: (err) => {
        console.error("Error creating branch", err);
        this.toastr.error("Error creating branch!", "Bootstrap");
      },
    });
  }
}
