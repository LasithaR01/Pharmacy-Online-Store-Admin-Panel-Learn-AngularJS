import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/core/models/category.models";
import { CategoryService } from "src/app/core/services/category.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  categories: Category[] = [];

  constructor (private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Home" }, { label: "Categories", active: true }];

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        console.log("Categories loaded:", this.categories);
      },
      error: (err) => {
        console.error("Failed to load categories", err);
      }
    });

    console.log('cat: ', this.categories)
  }
}
