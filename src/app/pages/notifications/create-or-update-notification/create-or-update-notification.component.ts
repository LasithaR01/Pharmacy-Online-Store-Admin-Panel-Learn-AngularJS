// src/app/notifications/create-or-update-notification/create-or-update-notification.component.ts

import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { NotificationService } from "src/app/core/services/notification.service";
import { NotificationType } from "src/app/core/models/notification.models";

@Component({
  selector: "app-create-notification",
  templateUrl: "./create-or-update-notification.component.html",
  styleUrls: ["./create-or-update-notification.component.scss"],
})
export class CreateOrUpdateNotificationComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  notificationId: number | null = null;
  notificationTypes = Object.values(NotificationType);

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  notificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Notification", active: true },
    ];

    this.notificationForm = this.fb.group({
      userId: ["", Validators.required],
      title: ["", Validators.required],
      message: ["", Validators.required],
      isRead: [false],
      notificationType: [NotificationType.SYSTEM, Validators.required],
      relatedId: [null],
    });

    this.route.paramMap.subscribe((params) => {
      this.notificationId = +params.get("id");
      if (this.notificationId) {
        this.isEditMode = true;
        this.loadNotification();
      }
    });
  }

  loadNotification() {
    this.notificationService.getById(this.notificationId!).subscribe({
      next: (notification) => {
        this.notificationForm.patchValue(notification);
      },
      error: () => {
        this.toastr.error("Error loading notification");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.notificationForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.notificationForm.invalid) return;

    if (this.isEditMode && this.notificationId) {
      this.notificationService
        .update(this.notificationId, this.notificationForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("Notification updated successfully!", "Success");
            this.router.navigate(["/notifications/list"]);
          },
          error: () => {
            this.toastr.error("Error updating notification!", "Error");
          },
        });
    } else {
      this.notificationService.create(this.notificationForm.value).subscribe({
        next: () => {
          this.toastr.success("Notification created successfully!", "Success");
          this.router.navigate(["/notifications/list"]);
          this.notificationForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating notification!", "Error");
        },
      });
    }
  }
}
