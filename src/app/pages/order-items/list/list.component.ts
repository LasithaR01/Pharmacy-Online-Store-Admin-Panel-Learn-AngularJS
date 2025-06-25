// src/app/order-items/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { OrderItem } from "src/app/core/models/order-item.models";
import { OrderItemService } from "src/app/core/services/order-item.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  orderItems: OrderItem[] = [];
  filteredOrderItems: OrderItem[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private orderItemService: OrderItemService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Order Items", active: true },
    ];

    this.loadOrderItems();
  }

  loadOrderItems() {
    this.orderItemService.getAll().subscribe({
      next: (data) => {
        this.orderItems = data;
        this.filteredOrderItems = [...this.orderItems];
      },
      error: (err) => {
        console.error("Failed to load order items", err);
        this.toastr.error("Failed to load order items");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredOrderItems = [...this.orderItems];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredOrderItems = this.orderItems.filter(item =>
      (item.productName && item.productName.toLowerCase().includes(term)) ||
      (item.productBarcode && item.productBarcode.toLowerCase().includes(term)) ||
      item.id.toString().includes(term)
    );
  }

  edit(id: number): void {
    this.router.navigate(["/order-items/update", id]);
  }

  showDeleteModal(id: number): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.orderItemService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Order item deleted successfully!", "Success");
        this.loadOrderItems();
      },
      error: () => {
        this.toastr.error("Error deleting order item");
      },
    });
    this.removeItemModal?.hide();
  }
}
