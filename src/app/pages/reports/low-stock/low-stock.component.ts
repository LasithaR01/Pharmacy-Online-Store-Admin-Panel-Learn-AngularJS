// src/app/stocks/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/core/models/product.models";
import { Stock } from "src/app/core/models/stock.models";
import { ProductService } from "src/app/core/services/product.service";
import { ReportService } from "src/app/core/services/report.service";
import { StockService } from "src/app/core/services/stock.service";

@Component({
  selector: "app-stock-list",
  templateUrl: "./low-stock.component.html",
  styleUrls: ["./low-stock.component.scss"],
})
export class LowStockComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private stockService: StockService,
    public router: Router,
    public toastr: ToastrService,
    public productService: ProductService,
        public reportService: ReportService
    
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Stocks", active: true },
    ];

    this.loadLowStockProducts();
  }

  loadLowStockProducts() {
    this.productService.getLowStock().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      error: (err) => {
        console.error("Failed to load stocks", err);
        this.toastr.error("Failed to load stocks");
      },
    });
  }

downloadReport() {
  this.reportService.exportLowStock().subscribe({
    next: (response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'low-stock-products.xls';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Report download failed', err);
      this.toastr.error("Failed to download report");
    }
  });
}

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    // this.products = this.products.filter(stock =>
    //   (stock.productName && stock.productName.toLowerCase().includes(term)) ||
    //   (stock.batchNumber && stock.batchNumber.toLowerCase().includes(term)) ||
    //   (stock.supplierName && stock.supplierName.toLowerCase().includes(term)) ||
    //   (stock.branchName && stock.branchName.toLowerCase().includes(term))
    // );
  }

  edit(id: number): void {
    this.router.navigate(["/stocks/update", id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.stockService.remove(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Stock deleted successfully!", "Success");
        this.loadLowStockProducts();
      },
      error: () => {
        this.toastr.error("Error deleting stock");
      },
    });
    this.removeItemModal?.hide();
  }
}
