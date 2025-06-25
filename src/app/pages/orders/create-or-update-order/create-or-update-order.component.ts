// src/app/orders/create-or-update-order/create-or-update-order.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/core/services/order.service';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from 'src/app/core/models/order.models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-or-update-order.component.html',
  styleUrls: ['./create-or-update-order.component.scss']
})
export class CreateOrUpdateOrderComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  orderId: number | null = null;

  breadCrumbItems: Array<{}>;
  orderForm: FormGroup;
  OrderStatus = OrderStatus;
  PaymentMethod = PaymentMethod;
  PaymentStatus = PaymentStatus;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: this.isEditMode ? 'Update Order' : 'Create Order', active: true }
    ];

    this.orderForm = this.fb.group({
      userId: ['', Validators.required],
      branchId: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      discountAmount: [0, [Validators.required, Validators.min(0)]],
      taxAmount: [0, [Validators.required, Validators.min(0)]],
      status: [OrderStatus.PENDING, Validators.required],
      paymentMethod: [null],
      paymentStatus: [PaymentStatus.PENDING, Validators.required],
      notes: [''],
      processedById: [null]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.isEditMode = true;
        this.loadOrder();
      }
    });
  }

  loadOrder() {
    this.orderService.getById(this.orderId!).subscribe({
      next: (order) => {
        this.orderForm.patchValue(order);
      },
      error: () => {
        this.toastr.error('Error loading order');
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      Object.values(this.orderForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const orderData = this.orderForm.value;

    if (this.isEditMode && this.orderId) {
      this.orderService.updateStatus(this.orderId, orderData.status).subscribe({
        next: () => {
          this.toastr.success('Order updated successfully!', 'Success');
          this.router.navigate(['/orders/list']);
        },
        error: () => {
          this.toastr.error('Error updating order!', 'Error');
        }
      });
    } else {
      this.orderService.create(orderData).subscribe({
        next: () => {
          this.toastr.success('Order created successfully!', 'Success');
          this.router.navigate(['/orders/list']);
          this.orderForm.reset();
        },
        error: () => {
          this.toastr.error('Error creating order!', 'Error');
        }
      });
    }
  }

  onCheckout() {
    if (this.orderForm.invalid) return;

    const paymentMethod = this.orderForm.get('paymentMethod')?.value;
    if (!paymentMethod) {
      this.toastr.warning('Please select a payment method', 'Warning');
      return;
    }

    if (this.orderId) {
      this.orderService.checkout(this.orderId, paymentMethod).subscribe({
        next: () => {
          this.toastr.success('Order checked out successfully!', 'Success');
          this.router.navigate(['/orders/list']);
        },
        error: () => {
          this.toastr.error('Error checking out order!', 'Error');
        }
      });
    }
  }
}
