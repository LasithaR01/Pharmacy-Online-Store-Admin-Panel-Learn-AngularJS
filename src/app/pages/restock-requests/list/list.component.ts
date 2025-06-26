// src/app/pages/restock-requests/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { RestockRequest, RestockStatus } from "src/app/core/models/restock-request.models";
import { RestockRequestService } from "src/app/core/services/restock-request.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  requests: RestockRequest[] = [];
  filteredRequests: RestockRequest[] = [];
  searchTerm: string = '';
  statusFilter: RestockStatus | 'ALL' = 'ALL';
  RestockStatus = RestockStatus;

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: any;

  constructor(
    private restockRequestService: RestockRequestService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Restock Requests", active: true },
    ];

    this.loadRequests();
  }

  loadRequests() {
    this.restockRequestService.getAll().subscribe({
      next: (data) => {
        this.requests = data;
        this.filteredRequests = [...this.requests];
      },
      error: (err) => {
        console.error("Failed to load restock requests", err);
        this.toastr.error("Failed to load restock requests");
      },
    });
  }

  applyFilter() {
    let filtered = [...this.requests];

    // Apply status filter
    if (this.statusFilter !== 'ALL') {
      filtered = filtered.filter(req => req.status === this.statusFilter);
    }

    // Apply search term filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(req =>
        (req.productName && req.productName.toLowerCase().includes(term)) ||
        (req.branchName && req.branchName.toLowerCase().includes(term)) ||
        (req.requestedByName && req.requestedByName.toLowerCase().includes(term)) ||
        (req.quantity && req.quantity.toString().includes(term))
      );
    }

    this.filteredRequests = filtered;
  }

  edit(id: number): void {
    this.router.navigate(['/restock-requests/update', id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.restockRequestService.remove(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Restock request deleted successfully!", "Success");
        this.loadRequests();
      },
      error: () => {
        this.toastr.error("Error deleting restock request");
      },
    });
    this.removeItemModal?.hide();
  }

  approveRequest(id: number): void {
    // In a real app, you'd get the approver ID from the auth service
    const approvedById = 1; // Replace with actual user ID
    this.restockRequestService.approveRequest(id, approvedById).subscribe({
      next: () => {
        this.toastr.success("Request approved successfully!", "Success");
        this.loadRequests();
      },
      error: () => {
        this.toastr.error("Error approving request");
      },
    });
  }
}
