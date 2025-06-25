// src/app/inventories/list/list.component.ts

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Inventory } from "src/app/core/models/inventory.models";
import { InventoryService } from "src/app/core/services/inventory.service";

@Component({
  selector: "app-inventory-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  inventories: Inventory[] = [];
  filteredInventories: Inventory[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private inventoryService: InventoryService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Inventories", active: true },
    ];

    this.loadInventories();
  }

  loadInventories() {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventories = data;
        this.filteredInventories = [...this.inventories];
      },
      error: (err) => {
        console.error("Failed to load inventories", err);
        this.toastr.error("Failed to load inventories");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredInventories = [...this.inventories];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredInventories = this.inventories.filter(inventory =>
      (inventory.shelfLocation && inventory.shelfLocation.toLowerCase().includes(term)) ||
      inventory.stockLevel.toString().includes(term)
    );
  }

  edit(id: number): void {
    this.router.navigate([`/inventories/update`, id]);
  }

  showDeleteModal(id: number): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.inventoryService.delete(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Inventory deleted successfully!", "Success");
        this.loadInventories();
      },
      error: () => {
        this.toastr.error("Error deleting inventory");
      },
    });
    this.removeItemModal?.hide();
  }
}
