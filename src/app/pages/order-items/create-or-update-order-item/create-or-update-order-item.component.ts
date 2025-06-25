// src/app/order-items/create-or-update-order-item/create-or-update-order-item.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { OrderItemService } from "src/app/core/services/order-item.service";

@Component({
  selector: "app-create-order-item",
  templateUrl: "./create-or-update-order-item.component.html",
  styleUrls: ["./create-or-update-order-item.component.scss"],
})
export class CreateOrUpdateOrderItemComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  orderItemId: number | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  orderItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderItemService: OrderItemService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Order Item", active: true },
    ];

    this.orderItemForm = this.fb.group({
      orderId: ["", Validators.required],
      productId: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.min(1)]],
      price: ["", [Validators.required, Validators.min(0)]],
      discountAmount: ["", [Validators.min(0)]],
    });

    this.route.paramMap.subscribe((params) => {
      this.orderItemId = Number(params.get("id"));
      if (this.orderItemId) {
        this.isEditMode = true;
        this.loadOrderItem();
      }
    });
  }

  loadOrderItem() {
    this.orderItemService.getById(this.orderItemId!).subscribe({
      next: (item) => {
        this.orderItemForm.patchValue(item);
      },
      error: () => {
        this.toastr.error("Error loading order item");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.orderItemForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.orderItemForm.invalid) return;

    if (this.isEditMode && this.orderItemId) {
      this.orderItemService
        .update(this.orderItemId, this.orderItemForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("Order item updated successfully!", "Success");
            this.router.navigate(["/order-items/list"]);
          },
          error: () => {
            this.toastr.error("Error updating order item!", "Error");
          },
        });
    } else {
      this.orderItemService.create(this.orderItemForm.value).subscribe({
        next: () => {
          this.toastr.success("Order item created successfully!", "Success");
          this.router.navigate(["/order-items/list"]);
          this.orderItemForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating order item!", "Error");
        },
      });
    }
  }
}
