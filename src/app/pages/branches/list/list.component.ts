import { Component, OnInit } from "@angular/core";
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

  constructor(private branchService: BranchService) {}

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

    console.log("branches: ", this.branches);
  }
}
