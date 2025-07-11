// src/app/orders/create-or-update-order/create-or-update-order.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrderService } from "src/app/core/services/order.service";
import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "src/app/core/models/order.models";

@Component({
  selector: "app-create-order",
  templateUrl: "./order-detail.component.html",
  // styleUrls: ['./create-or-update-order.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId: number | null = null;

  breadCrumbItems: Array<{}>;
  filteredOrders: any[] = [];
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Order Details", active: true },
    ];

    this.orderForm = this.fb.group({
      customerName: ["", Validators.required],
      // branchId: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      // discountAmount: [0, [Validators.required, Validators.min(0)]],
      // taxAmount: [0, [Validators.required, Validators.min(0)]],
      status: [OrderStatus.PENDING, Validators.required],
      paymentMethod: [null],
      paymentStatus: [PaymentStatus.PENDING, Validators.required],
      // notes: [''],
      // processedById: [null]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.orderId = +id;
        // this.isEditMode = true;
        this.loadOrder();
      }
    });

    // this.filteredOrders = [
    //   {
    //       id: 1,
    //       orderItemName: 1,
    //       price: 1,
    //       quantity: 2
    //   }
    // ]
  }

  loadOrder() {
    this.orderService.getById(this.orderId!).subscribe({
      next: (order) => {
        console.log("order details: ", order);
        this.orderForm.patchValue(order);
        this.filteredOrders = order.orderItems;
      },
      error: () => {
        this.toastr.error("Error loading order");
      },
    });
  }

  onSubmit(): void {}
}
