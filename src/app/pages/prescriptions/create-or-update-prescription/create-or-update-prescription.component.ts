// src/app/prescriptions/create-or-update-prescription/create-or-update-prescription.component.ts

import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { PrescriptionService } from "src/app/core/services/prescription.service";
import { Prescription, PrescriptionStatus } from "src/app/core/models/prescription.models";

@Component({
  selector: "app-create-prescription",
  templateUrl: "./create-or-update-prescription.component.html",
  styleUrls: ["./create-or-update-prescription.component.scss"],
})
export class CreateOrUpdatePrescriptionComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  prescriptionId: number;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  prescriptionForm: FormGroup;
  statusOptions = Object.values(PrescriptionStatus);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Prescriptions", path: "/prescriptions/list" },
      { label: this.isEditMode ? "Update" : "Create", active: true },
    ];

    this.prescriptionForm = this.fb.group({
      userId: ["", Validators.required],
      doctorName: ["", Validators.required],
      doctorContact: ["", Validators.required],
      prescriptionDate: ["", Validators.required],
      status: [PrescriptionStatus.PENDING, Validators.required],
      notes: [""],
      documentUrl: [""]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.prescriptionId = +id;
        this.loadPrescription();
      }
    });
  }

  loadPrescription() {
    this.prescriptionService.getById(this.prescriptionId).subscribe({
      next: (prescription) => {
        // Format date for the form
        const formattedDate = new Date(prescription.prescriptionDate).toISOString().split('T')[0];
        this.prescriptionForm.patchValue({
          ...prescription,
          prescriptionDate: formattedDate
        });
      },
      error: () => {
        this.toastr.error("Error loading prescription");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.prescriptionForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.prescriptionForm.invalid) return;

    const formData = {
      ...this.prescriptionForm.value,
      prescriptionDate: new Date(this.prescriptionForm.value.prescriptionDate)
    };

    if (this.isEditMode) {
      this.prescriptionService.update(this.prescriptionId, formData).subscribe({
        next: () => {
          this.toastr.success("Prescription updated successfully!", "Success");
          this.router.navigate(["/prescriptions/list"]);
        },
        error: () => {
          this.toastr.error("Error updating prescription!", "Error");
        },
      });
    } else {
      this.prescriptionService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Prescription created successfully!", "Success");
          this.router.navigate(["/prescriptions/list"]);
          this.prescriptionForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating prescription!", "Error");
        },
      });
    }
  }
}
