// src/app/services/cart.service.ts

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart } from "../models/cart.model";
import { productModel } from "src/app/pages/ecommerce/product.model";
import { Customer } from "../models/customer.models";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly STORAGE_KEY = "cart";
  private cartItems: Cart[] = [];
  private customer: Customer;

  private cartSubject = new BehaviorSubject<any[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): Cart[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      this.cartItems = parsed.cartItems || [];
      this.customer = parsed.customer || null;
    }
    return this.cartItems;
  }

  private saveCart(): void {
    const data = {
      cartItems: this.cartItems,
      customer: this.customer,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.cartSubject.next(this.cartItems);
  }

  // === CART OPERATIONS ===

  getCartItems(): Cart[] {
    return this.cartItems;
  }

  addToCart(product: productModel) {
    const existing = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existing) {
      existing.qty += 1;
    } else {
      this.cartItems.push({ product, qty: 1, price: product.price });
    }
    this.saveCart();
  }

  updateQuantity(productId: number, qty: number) {
    console.log('productId: ', productId)
        console.log('qty: ', qty)

    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.qty = qty;
      this.saveCart();
    }
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.customer = null;
    this.saveCart();
  }

  getTotalCost(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.qty,
      0
    );
  }

  // === CUSTOMER OPERATIONS ===

  setCustomer(customer: Customer): void {
    this.customer = customer;
    this.saveCart();
  }

  getCustomer(): Customer | null {
    return this.customer;
  }

  clearCustomer(): void {
    this.customer = null;
    this.saveCart();
  }
}
