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
  // bread crumb items
  breadCrumbItems: Array<{}>;
  branches: Branch[] = [];

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private branchService: BranchService,
    public router: Router,  // Changed to public to access in template
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Branches", active: true },  // Changed from "Categories" to "Branches"
    ];

    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (err) => {
        console.error("Failed to load branches", err);
        this.toastr.error("Failed to load branches");
      },
    });
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
        this.loadBranches();  // Refresh the list after deletion
      },
      error: () => {
        this.toastr.error("Error deleting branch");
      },
    });
    this.removeItemModal?.hide();
  }
}
