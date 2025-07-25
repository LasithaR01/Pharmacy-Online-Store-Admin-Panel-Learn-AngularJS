import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Cart } from "./cart.model";
import { cartData } from "./data";
import { CartService } from "src/app/core/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})

/**
 * Ecommerce Cart component
 */
export class CartComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  value: number;

  cartData: Cart[];
  subtotal: any = 0;
  discount: any;
  discountRate = 0.15;
  shipping: any;
  shippingRate: any = "65.00";
  tax: any;
  taxRate = 0.125;
  totalprice: any;
  test: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.value = 4;
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Cart", active: true },
    ];

    /**
     * fetches the data
     */
    this._fetchData();
    this.cartService.cart$.subscribe((data) => {
      this.test = data;
      // this.recalculateTotal();
    });

    console.log("test: ", this.test);
  }

  /**
   * Cart data fetch
   */
  private _fetchData() {
    this.cartData = cartData;
    this.cartData.map((x: any) => {
      x["total"] = (x["qty"] * x["price"]).toFixed(2);
      this.subtotal += parseFloat(x["total"]);
    });
    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalprice = (
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shippingRate) -
      parseFloat(this.discount)
    ).toFixed(2);
  }

  removeItem(productId: number) {
    console.log("product to remove: ", productId);
    this.cartService.removeItem(productId);
    // this.toastr.success(`${product.name} added to cart`);
  }

  // Delete Data
  delete(event: any, data: any) {
    console.log("datqa: ", data);
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
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then((result) => {
        console.log("going to remove a item: ", result);
        this.removeItem(data.product.id);
        // if (result.value) {
        //   swalWithBootstrapButtons.fire(
        //     "Deleted!",
        //     "Your file has been deleted.",
        //     "success"
        //   );
        //   event.target.closest("tr")?.remove();
        // }
      });
  }

  incrementQty(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity + 1);
  }

  decrementQty(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity - 1);
  }

  // Increment Decrement Quantity
  qty: number = 0;
  calculateQty(id: any, qty: any, i: any) {
    this.subtotal = 0;
    // if (id == "0" && qty > 1) {
    //   qty--;
    //   this.cartData[i].qty = qty;
    //   this.cartData[i].total = (
    //     this.cartData[i].qty * this.cartData[i].price
    //   ).toFixed(2);
    // }
    // if (id == "1") {
    //   qty++;
    //   this.cartData[i].qty = qty;
    //   this.cartData[i].total = (
    //     this.cartData[i].qty * this.cartData[i].price
    //   ).toFixed(2);
    // }
    // this.cartData.map((x: any) => {
    //   this.subtotal += parseFloat(x["total"]);
    // });
    // this.subtotal = this.subtotal.toFixed(2);
    // this.discount = (this.subtotal * this.discountRate).toFixed(2);
    // this.tax = (this.subtotal * this.taxRate).toFixed(2);
    // this.totalprice = (
    //   parseFloat(this.subtotal) +
    //   parseFloat(this.tax) +
    //   parseFloat(this.shippingRate) -
    //   parseFloat(this.discount)
    // ).toFixed(2);
  }
}
