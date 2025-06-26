// src/app/alerts/create-or-update-alert/create-or-update-alert.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alert, AlertType } from 'src/app/core/models/alert.models';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-or-update-alert.component.html',
  styleUrls: ['./create-or-update-alert.component.scss']
})
export class CreateOrUpdateAlertComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  alertId: number | null = null;

  breadCrumbItems: Array<{}>;
  alertForm: FormGroup;
  alertTypes = Object.values(AlertType);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: this.isEditMode ? 'Update Alert' : 'Create Alert', active: true }
    ];

    this.alertForm = this.fb.group({
      productId: ['', Validators.required],
      branchId: ['', Validators.required],
      alertType: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      triggeredById: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.alertId = +id;
        this.isEditMode = true;
        this.loadAlert();
      }
    });
  }

  loadAlert(): void {
    if (!this.alertId) return;

    this.alertService.getById(this.alertId).subscribe({
      next: (alert) => {
        this.alertForm.patchValue(alert);
      },
      error: () => {
        this.toastr.error('Error loading alert');
      }
    });
  }

  onSubmit(): void {
    if (this.alertForm.invalid) {
      this.alertForm.markAllAsTouched();
      return;
    }

    const alertData = this.alertForm.value;

    if (this.isEditMode && this.alertId) {
      this.alertService.update(this.alertId, alertData).subscribe({
        next: () => {
          this.toastr.success('Alert updated successfully!', 'Success');
          this.router.navigate(['/alerts/list']);
        },
        error: () => {
          this.toastr.error('Error updating alert!', 'Error');
        }
      });
    } else {
      this.alertService.create(alertData).subscribe({
        next: () => {
          this.toastr.success('Alert created successfully!', 'Success');
          this.router.navigate(['/alerts/list']);
          this.alertForm.reset();
        },
        error: () => {
          this.toastr.error('Error creating alert!', 'Error');
        }
      });
    }
  }
}
