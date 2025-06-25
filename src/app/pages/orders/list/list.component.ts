// src/app/orders/list/list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderStatus, PaymentStatus } from 'src/app/core/models/order.models';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';
  OrderStatus = OrderStatus;
  PaymentStatus = PaymentStatus;

  @ViewChild('removeItemModal', { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private orderService: OrderService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Orders', active: true }
    ];

    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = [...this.orders];
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.toastr.error('Failed to load orders');
      }
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredOrders = [...this.orders];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      (order.id && order.id.toString().includes(term)) ||
      (order.userName && order.userName.toLowerCase().includes(term)) ||
      (order.branchName && order.branchName.toLowerCase().includes(term)) ||
      (order.status && order.status.toLowerCase().includes(term))
    );
  }

  edit(id: number): void {
    this.router.navigate(['/orders/update', id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  // src/app/orders/list/list.component.ts
delete(): void {
    this.orderService.deleteOrder(this.deleteId).subscribe({
      next: () => {
        this.toastr.success('Order deleted successfully!', 'Success');
        this.loadOrders();
      },
      error: () => {
        this.toastr.error('Error deleting order');
      }
    });
    this.removeItemModal?.hide();
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.COMPLETED:
        return 'badge bg-success';
      case OrderStatus.PROCESSING:
        return 'badge bg-primary';
      case OrderStatus.PENDING:
        return 'badge bg-warning';
      case OrderStatus.CANCELLED:
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getPaymentStatusClass(status: PaymentStatus): string {
    switch (status) {
      case PaymentStatus.PAID:
        return 'badge bg-success';
      case PaymentStatus.PENDING:
        return 'badge bg-warning';
      case PaymentStatus.FAILED:
        return 'badge bg-danger';
      case PaymentStatus.REFUNDED:
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }
}
