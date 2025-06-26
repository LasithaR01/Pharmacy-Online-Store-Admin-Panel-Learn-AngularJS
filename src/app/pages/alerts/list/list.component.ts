// src/app/alerts/list/list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Alert, AlertStatus, AlertType } from 'src/app/core/models/alert.models';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  alerts: Alert[] = [];
  filteredAlerts: Alert[] = [];
  searchTerm: string = '';
  selectedStatus: AlertStatus | 'ALL' = 'ALL';
  selectedType: AlertType | 'ALL' = 'ALL';
  showCriticalOnly: boolean = false;
  resolvedById: number = 1; // Default user ID
  AlertStatus = AlertStatus; // Make enum available in template
  AlertType = AlertType; // Make enum available in template
  alertTypes = Object.values(AlertType); // For dropdown

  @ViewChild('resolveModal', { static: false }) resolveModal?: ModalDirective;
  selectedAlertId?: number;

  constructor(
    private alertService: AlertService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Alerts', active: true }
    ];

    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getAll().subscribe({
      next: (data) => {
        this.alerts = data.map(alert => ({
          ...alert,
          critical: this.isCritical(alert)
        }));
        this.applyFilters();
      },
      error: () => {
        this.toastr.error('Failed to load alerts');
      }
    });
  }

  isCritical(alert: Alert): boolean {
    return alert.alertType === AlertType.OUT_OF_STOCK ||
           alert.alertType === AlertType.EXPIRY_CRITICAL;
  }

  applyFilters(): void {
    this.filteredAlerts = this.alerts.filter(alert => {
      const matchesSearch = !this.searchTerm ||
        alert.message.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (alert.productName && alert.productName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (alert.branchName && alert.branchName.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesStatus = this.selectedStatus === 'ALL' || alert.status === this.selectedStatus;
      const matchesType = this.selectedType === 'ALL' || alert.alertType === this.selectedType;
      const matchesCritical = !this.showCriticalOnly || this.isCritical(alert);

      return matchesSearch && matchesStatus && matchesType && matchesCritical;
    });
  }

  showResolveModal(id: number): void {
    this.selectedAlertId = id;
    this.resolveModal?.show();
  }

  resolve(resolvedById: number): void {
    if (!this.selectedAlertId) return;

    this.alertService.resolve(this.selectedAlertId, resolvedById).subscribe({
      next: () => {
        this.toastr.success('Alert resolved successfully!');
        this.loadAlerts();
      },
      error: () => {
        this.toastr.error('Error resolving alert');
      }
    });
    this.resolveModal?.hide();
  }

  resolveMultiple(): void {
    const selectedAlerts = this.filteredAlerts.filter(a => a.resolved);
    if (selectedAlerts.length === 0) {
      this.toastr.warning('No alerts selected');
      return;
    }

    this.alertService.resolveMultiple(
      selectedAlerts.map(a => a.id),
      this.resolvedById
    ).subscribe({
      next: () => {
        this.toastr.success(`${selectedAlerts.length} alerts resolved successfully!`);
        this.loadAlerts();
      },
      error: () => {
        this.toastr.error('Error resolving alerts');
      }
    });
  }

  getAlertTypeClass(alertType: AlertType): string {
    switch (alertType) {
      case AlertType.OUT_OF_STOCK:
      case AlertType.EXPIRY_CRITICAL:
        return 'danger';
      case AlertType.LOW_STOCK:
      case AlertType.EXPIRY_WARNING:
        return 'warning';
      case AlertType.TRANSFER_REQUEST:
        return 'info';
      default:
        return 'secondary';
    }
  }
}
