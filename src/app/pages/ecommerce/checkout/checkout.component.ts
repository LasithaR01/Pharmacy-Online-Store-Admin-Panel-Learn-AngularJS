import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "src/app/core/models/cart.model";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "src/app/core/models/order.models";
import { CartService } from "src/app/core/services/cart.service";
import { CustomerService } from "src/app/core/services/customer.service";
import { OrderService } from "src/app/core/services/order.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})

/**
 * Ecommerce checkout component
 */
export class CheckoutComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  selectValue: string[] = [];
  stateValue: string[] = [];
  test: any;
  totalCost: number;
  searchTerm: string = "";
  cartItems: any[];
  customer: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Checkout", active: true },
    ];

    this.selectValue = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Argentina",
      "Hawaii",
      "California",
      "Colombia",
      "Congo",
      "Dominica",
      "Denmark",
      "Nevada",
      "Oregon",
      "Washington",
      "Ecuador",
      "Idaho",
      "Montana",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "Nicaragua",
      "New Caledonia",
      "North Dakota",
      "Tonga",
      "Tunisia",
      "Thailand",
      "Turkey",
      "Illinois",
      "Tuvalu",
      "Uganda",
      "Uruguay",
      "United Arab Emirates",
      "United Kingdom",
      "Venezuela",
      "Zimbabwe",
      "Uruguay",
    ];

    this.stateValue = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Montana",
      "Nevada",
      "New Mexico",
      "New York",
      "North Dakota",
      "Texas",
      "Virginia",
      "Wisconsin",
      "Wyoming",
    ];
    this.cartService.cart$.subscribe((data) => {
      this.test = data;
      // this.recalculateTotal();
    });
    this.totalCost = this.cartService.getTotalCost();
    console.log("test: ", this.test);
  }

  applyFilter() {
    console.log("applye filter");
    // if (!this.searchTerm) {
    //   this.filteredBranches = [...this.branches];
    //   return;
    // }

    // const term = this.searchTerm.toLowerCase();
    // this.filteredBranches = this.branches.filter(branch =>
    //   branch.name.toLowerCase().includes(term) ||
    //   (branch.location && branch.location.toLowerCase().includes(term)) ||
    //   (branch.contactNumber && branch.contactNumber.toLowerCase().includes(term))
    // );
  }

  onCreateCustomer(): void {
    console.log("create customer");
    this.customerService
      .create({
        name: "test customer",
        phoneNumber: "0113123887",
      })
      .subscribe({
        next: () => {
          this.toastr.success("Customer created successfully!", "Success");
        },
      });
  }

  placeOrder() {
    const cartItems = this.cartService.getCartItems();
    const customer = this.cartService.getCustomer();

    console.log("customer: ", customer);

    const data = {
      userId: customer ? customer.id : null,
      branchId: 1,
      totalAmount: this.cartService.getTotalCost(),
      discountAmount: 0,
      taxAmount: 0,
      status: OrderStatus.COMPLETED,
      paymentMethod: PaymentMethod.CASH,
      paymentStatus: PaymentStatus.PAID,
      notes: "test notes",
      processedById: null,
      orderItems: cartItems.map((cartItem: Cart) => ({
        productId: cartItem.product.id,
        quantity: cartItem.qty,
        price: cartItem.product.price,
        discountAmount: 0,
        productName: cartItem.product.name,
        productBarcode: cartItem.product.barcode,
        totalPrice: cartItem.product.price * cartItem.qty,
      })),
    };
    console.log("place order data: ", data);

    this.orderService.create(data).subscribe({
      next: () => {
        this.toastr.success("Order created successfully!", "Success");
        this.cartService.clearCart();
      },
      error: () => {
        this.toastr.error("Error creating order!", "Error");
      },
    });
  }

  // Delete Data
  confirmOrder(event: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ms-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Yes, Place order!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // ✅ Call your placeOrder function here
          this.placeOrder();

          // Optional success message
          // swalWithBootstrapButtons.fire(
          //   "Confirmed!",
          //   "Order has been places.",
          //   "success"
          // );
          // event.target.closest("tr")?.remove();
        }
      });
  }
}
