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
  breadCrumbItems: Array<{}>;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private categoryService: CategoryService,
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
        this.filteredCategories = [...this.categories];
      },
      error: (err) => {
        console.error("Failed to load categories", err);
        this.toastr.error("Failed to load categories");
      },
    });
  }

  searchCategories(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilter();
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredCategories = [...this.categories];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(term) ||
      (category.description && category.description.toLowerCase().includes(term)) ||
      (category.parent?.name && category.parent.name.toLowerCase().includes(term))
    );
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
