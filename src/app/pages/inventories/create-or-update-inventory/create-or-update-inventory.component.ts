// src/app/inventories/create-or-update/create-or-update-inventory.component.ts

import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastrService } from "ngx-toastr";
import { InventoryService } from "src/app/core/services/inventory.service";

@Component({
  selector: "app-create-inventory",
  templateUrl: "./create-or-update-inventory.component.html",
  styleUrls: ["./create-or-update-inventory.component.scss"],
})
export class CreateOrUpdateInventoryComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  inventoryId: number | null = null;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  inventoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Inventory", active: true },
    ];

    this.inventoryForm = this.fb.group({
      productId: ["", Validators.required],
      branchId: ["", Validators.required],
      shelfLocation: [""],
      stockLevel: [0, Validators.required],
      minimumStockLevel: [0],
      maximumStockLevel: [0],
      expiryAlert: [false],
      lowStockAlert: [false],
    });

    this.route.paramMap.subscribe((params) => {
      this.inventoryId = Number(params.get("id"));
      if (this.inventoryId) {
        this.isEditMode = true;
        this.loadInventory();
      }
    });
  }

  loadInventory() {
    this.inventoryService.getById(this.inventoryId!).subscribe({
      next: (inventory) => {
        this.inventoryForm.patchValue(inventory);
      },
      error: () => {
        this.toastr.error("Error loading inventory");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.inventoryForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.inventoryForm.invalid) return;
    if (this.isEditMode && this.inventoryId) {
      this.inventoryService
        .update(this.inventoryId, this.inventoryForm.value)
        .subscribe({
          next: () => {
            this.toastr.success("Inventory updated successfully!", "Success");
            this.router.navigate(["/inventories/list"]);
          },
          error: () => {
            this.toastr.error("Error updating inventory!", "Error");
          },
        });
    } else {
      this.inventoryService.create(this.inventoryForm.value).subscribe({
        next: () => {
          this.toastr.success("Inventory created successfully!", "Success");
          this.router.navigate(["/inventories/list"]);
          this.inventoryForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating inventory!", "Error");
        },
      });
    }
  }
}
