// src/app/stocks/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Stock } from "src/app/core/models/stock.models";
import { StockService } from "src/app/core/services/stock.service";

@Component({
  selector: "app-stock-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private stockService: StockService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Stocks", active: true },
    ];

    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getAll().subscribe({
      next: (data) => {
        this.stocks = data;
        this.filteredStocks = [...this.stocks];
      },
      error: (err) => {
        console.error("Failed to load stocks", err);
        this.toastr.error("Failed to load stocks");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredStocks = [...this.stocks];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredStocks = this.stocks.filter(stock =>
      (stock.productName && stock.productName.toLowerCase().includes(term)) ||
      (stock.batchNumber && stock.batchNumber.toLowerCase().includes(term)) ||
      (stock.supplierName && stock.supplierName.toLowerCase().includes(term)) ||
      (stock.branchName && stock.branchName.toLowerCase().includes(term))
    );
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
        this.loadStocks();
      },
      error: () => {
        this.toastr.error("Error deleting stock");
      },
    });
    this.removeItemModal?.hide();
  }
}
