// src/app/customers/create-or-update-customer/create-or-update-customer.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "src/app/core/services/customer.service";

@Component({
  selector: "app-create-customer",
  templateUrl: "./create-or-update-customer.component.html",
  styleUrls: ["./create-or-update-customer.component.scss"],
})
export class CreateOrUpdateCustomerComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  customerId: number;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: this.isEditMode ? "Update Customer" : "Create Customer", active: true },
    ];

    this.customerForm = this.fb.group({
      userId: ["", Validators.required],
      address: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      loyaltyPoints: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.customerId = +id;
        this.loadCustomer();
      }
    });
  }

  loadCustomer() {
    this.customerService.getById(this.customerId).subscribe({
      next: (customer) => {
        // Format date for the form
        const formattedDate = customer.dateOfBirth ?
          new Date(customer.dateOfBirth).toISOString().split('T')[0] : '';

        this.customerForm.patchValue({
          ...customer,
          dateOfBirth: formattedDate
        });
      },
      error: () => {
        this.toastr.error("Error loading customer");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.customerForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.customerForm.invalid) return;

    const formData = {
      ...this.customerForm.value,
      dateOfBirth: new Date(this.customerForm.value.dateOfBirth)
    };

    if (this.isEditMode) {
      this.customerService.update(this.customerId, formData).subscribe({
        next: () => {
          this.toastr.success("Customer updated successfully!", "Success");
          this.router.navigate(["/customers/list"]);
        },
        error: () => {
          this.toastr.error("Error updating customer!", "Error");
        },
      });
    } else {
      this.customerService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Customer created successfully!", "Success");
          this.router.navigate(["/customers/list"]);
          this.customerForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating customer!", "Error");
        },
      });
    }
  }
}
