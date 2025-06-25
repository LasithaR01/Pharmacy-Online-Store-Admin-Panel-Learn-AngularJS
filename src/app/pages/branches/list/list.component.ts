import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Branch } from "src/app/core/models/branch.models";
import { BranchService } from "src/app/core/services/branch.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private branchService: BranchService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Branches", active: true },
    ];

    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
        this.filteredBranches = [...this.branches];
      },
      error: (err) => {
        console.error("Failed to load branches", err);
        this.toastr.error("Failed to load branches");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredBranches = [...this.branches];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      branch.name.toLowerCase().includes(term) ||
      (branch.location && branch.location.toLowerCase().includes(term)) ||
      (branch.contactNumber && branch.contactNumber.toLowerCase().includes(term))
    );
  }

  edit(id: string): void {
    this.router.navigate([`/branches/update`, id]);
  }

  showDeleteModal(id: string): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.branchService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Branch deleted successfully!", "Success");
        this.loadBranches();
      },
      error: () => {
        this.toastr.error("Error deleting branch");
      },
    });
    this.removeItemModal?.hide();
  }
}
