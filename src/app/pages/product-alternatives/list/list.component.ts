// src/app/product-alternatives/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ProductAlternative } from "src/app/core/models/product-alternative.models";
import { ProductAlternativeService } from "src/app/core/services/product-alternative.service";

@Component({
  selector: "app-product-alternatives-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  alternatives: ProductAlternative[] = [];
  filteredAlternatives: ProductAlternative[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private productAlternativeService: ProductAlternativeService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Product Alternatives", active: true },
    ];

    this.loadAlternatives();
  }

  loadAlternatives() {
    this.productAlternativeService.getAll().subscribe({
      next: (data) => {
        this.alternatives = data;
        this.filteredAlternatives = [...this.alternatives];
      },
      error: (err) => {
        console.error("Failed to load product alternatives", err);
        this.toastr.error("Failed to load product alternatives");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredAlternatives = [...this.alternatives];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredAlternatives = this.alternatives.filter(alt =>
      alt.productName?.toLowerCase().includes(term) ||
      alt.alternativeProductName?.toLowerCase().includes(term) ||
      alt.reason?.toLowerCase().includes(term)
    );
  }

  edit(id: number): void {
    this.router.navigate(["/product-alternatives/update", id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.productAlternativeService.remove(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Product alternative deleted successfully!", "Success");
        this.loadAlternatives();
      },
      error: () => {
        this.toastr.error("Error deleting product alternative");
      },
    });
    this.removeItemModal?.hide();
  }
}
