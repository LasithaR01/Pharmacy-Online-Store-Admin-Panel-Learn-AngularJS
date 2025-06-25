import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Prescription, PrescriptionStatus } from "src/app/core/models/prescription.models";
import { PrescriptionService } from "src/app/core/services/prescription.service";

@Component({
  selector: "app-prescription-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  prescriptions: Prescription[] = [];
  filteredPrescriptions: Prescription[] = [];
  searchTerm: string = '';
  statusOptions = Object.values(PrescriptionStatus);
  selectedStatus: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private prescriptionService: PrescriptionService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Prescriptions", active: true },
    ];

    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.prescriptionService.getAll().subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.filteredPrescriptions = [...this.prescriptions];
      },
      error: (err) => {
        console.error("Failed to load prescriptions", err);
        this.toastr.error("Failed to load prescriptions");
      },
    });
  }

  applyFilter() {
    let filtered = [...this.prescriptions];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(prescription =>
        prescription.doctorName.toLowerCase().includes(term) ||
        (prescription.doctorContact && prescription.doctorContact.toLowerCase().includes(term)) ||
        (prescription.userName && prescription.userName.toLowerCase().includes(term))
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(prescription => prescription.status === this.selectedStatus);
    }

    this.filteredPrescriptions = filtered;
  }

  edit(id: number): void {
    this.router.navigate(['/prescriptions/update', id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.prescriptionService.delete(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Prescription deleted successfully!", "Success");
        this.loadPrescriptions();
      },
      error: () => {
        this.toastr.error("Error deleting prescription");
      },
    });
    this.removeItemModal?.hide();
  }

  approve(id: number): void {
    // In a real app, you'd get the current user's ID
    const approvedById = 1; // Replace with actual user ID
    this.prescriptionService.approve(id, approvedById).subscribe({
      next: () => {
        this.toastr.success("Prescription approved successfully!", "Success");
        this.loadPrescriptions();
      },
      error: () => {
        this.toastr.error("Error approving prescription");
      },
    });
  }

  reject(id: number): void {
    // In a real app, you'd get the current user's ID
    const rejectedById = 1; // Replace with actual user ID
    this.prescriptionService.reject(id, rejectedById).subscribe({
      next: () => {
        this.toastr.success("Prescription rejected successfully!", "Success");
        this.loadPrescriptions();
      },
      error: () => {
        this.toastr.error("Error rejecting prescription");
      },
    });
  }
}
