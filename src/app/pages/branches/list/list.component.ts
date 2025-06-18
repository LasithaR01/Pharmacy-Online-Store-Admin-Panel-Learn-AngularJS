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
    private router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Categories", active: true },
    ];

    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
        console.log("Categories loaded:", this.branches);
      },
      error: (err) => {
        console.error("Failed to load categories", err);
      },
    });
  }

  edit(id: string): void {
    this.router.navigate([`/branches/update`, id]);
  }

  showDeleteModal(id: string): void {
    this.deletId = id;
    this.removeItemModal.show();
  }

  delete(): void {
    this.branchService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Branch deleted successfully!", "Success");
        // Optionally: refresh your list here
      },
      error: () => {
        this.toastr.error("Error deleting branch");
      },
    });
    this.removeItemModal.hide();
  }
}
