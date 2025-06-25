// src/app/pages/notifications/list/list.component.ts

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Notification } from "src/app/core/models/notification.models";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private notificationService: NotificationService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Notifications", active: true },
    ];

    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe({
      next: (data) => {
        this.notifications = data;
        this.filteredNotifications = [...this.notifications];
      },
      error: (err) => {
        console.error("Failed to load notifications", err);
        this.toastr.error("Failed to load notifications");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredNotifications = [...this.notifications];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredNotifications = this.notifications.filter(notification =>
      notification.title.toLowerCase().includes(term) ||
      (notification.message && notification.message.toLowerCase().includes(term)) ||
      (notification.userName && notification.userName.toLowerCase().includes(term))
    );
  }

  edit(id: number): void {
    this.router.navigate(['/notifications/update', id]);  // Fixed: Using string array instead of regex
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.toastr.success("Notification marked as read", "Success");
        this.loadNotifications();
      },
      error: () => {
        this.toastr.error("Error marking notification as read");
      },
    });
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.notificationService.delete(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Notification deleted successfully!", "Success");
        this.loadNotifications();
      },
      error: () => {
        this.toastr.error("Error deleting notification");
      },
    });
    this.removeItemModal?.hide();
  }
}
