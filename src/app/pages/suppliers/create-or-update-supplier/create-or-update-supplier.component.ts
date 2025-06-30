// src/app/pages/suppliers/create-or-update-supplier/create-or-update-supplier.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-or-update-supplier',
  templateUrl: './create-or-update-supplier.component.html',
  styleUrls: ['./create-or-update-supplier.component.scss']
})
export class CreateOrUpdateSupplierComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  supplierId: number | null = null;

  breadCrumbItems: Array<{}>;
  supplierForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private userService: UserService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: this.isEditMode ? "Update Supplier" : "Create Supplier", active: true },
    ];

    this.supplierForm = this.fb.group({
      userId: ["", Validators.required],
      companyName: ["", Validators.required],
      address: ["", Validators.required],
      taxId: [""]
    });

    this.loadUsers();

    this.route.paramMap.subscribe((params) => {
      this.supplierId = Number(params.get("id"));
      if (this.supplierId) {
        this.isEditMode = true;
        this.loadSupplier();
      }
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.toastr.error("Error loading users");
      },
    });
  }

  loadSupplier() {
    this.supplierService.getById(this.supplierId!).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue({
          userId: supplier.userId,
          companyName: supplier.companyName,
          address: supplier.address,
          taxId: supplier.taxId
        });
      },
      error: () => {
        this.toastr.error("Error loading supplier");
      },
    });
  }

  onSubmit(): void {
    Object.values(this.supplierForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.supplierForm.invalid) return;

    const formData = this.supplierForm.value;

    if (this.isEditMode && this.supplierId) {
      this.supplierService
        .update(this.supplierId, formData)
        .subscribe({
          next: () => {
            this.toastr.success("Supplier updated successfully!", "Success");
            this.router.navigate(["/suppliers/list"]);
          },
          error: () => {
            this.toastr.error("Error updating supplier!", "Error");
          },
        });
    } else {
      this.supplierService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Supplier created successfully!", "Success");
          this.router.navigate(["/suppliers/list"]);
          this.supplierForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating supplier!", "Error");
        },
      });
    }
  }
}
