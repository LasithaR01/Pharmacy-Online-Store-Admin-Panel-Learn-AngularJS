// src/app/pages/categories/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
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

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    public categoryService: CategoryService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Categories", active: true },
    ];

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Failed to load categories", err);
        this.toastr.error("Failed to load categories");
      },
    });
  }

  searchCategories(name: string) {
    this.categoryService.search(name).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.toastr.error("Failed to search categories");
      },
    });
  }

  edit(id: string): void {
    this.router.navigate([`/categories/update`, id]);
  }

  showDeleteModal(id: string): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.categoryService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Category deleted successfully!", "Success");
        this.loadCategories();
      },
      error: () => {
        this.toastr.error("Error deleting category");
      },
    });
    this.removeItemModal?.hide();
  }
}
