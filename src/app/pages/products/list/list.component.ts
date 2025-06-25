import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/core/models/product.models";
import { ProductService } from "src/app/core/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private productService: ProductService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Products", active: true },
    ];

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      error: (err) => {
        console.error("Failed to load products", err);
        this.toastr.error("Failed to load products");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      (product.barcode && product.barcode.toLowerCase().includes(term)) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  }

  edit(id: string): void {
    this.router.navigate([`/products/update`, id]);
  }

  showDeleteModal(id: string): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.productService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Product deleted successfully!", "Success");
        this.loadProducts();
      },
      error: () => {
        this.toastr.error("Error deleting product");
      },
    });
    this.removeItemModal?.hide();
  }
}
