// src/app/drug-interactions/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { DrugInteraction, InteractionSeverity } from "src/app/core/models/drug-interaction.model";
import { DrugInteractionService } from "src/app/core/services/drug-interaction.service";

@Component({
  selector: "app-drug-interactions-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  interactions: DrugInteraction[] = [];
  filteredInteractions: DrugInteraction[] = [];
  searchTerm: string = '';
  severityOptions = Object.values(InteractionSeverity);
  selectedSeverity: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: number;

  constructor(
    private interactionService: DrugInteractionService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Drug Interactions", active: true },
    ];

    this.loadInteractions();
  }

  loadInteractions() {
    this.interactionService.getAll().subscribe({
      next: (data) => {
        this.interactions = data;
        this.filteredInteractions = [...this.interactions];
      },
      error: (err) => {
        console.error("Failed to load drug interactions", err);
        this.toastr.error("Failed to load drug interactions");
      },
    });
  }

  applyFilter() {
    let filtered = [...this.interactions];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(int =>
        int.productName?.toLowerCase().includes(term) ||
        int.interactsWithName?.toLowerCase().includes(term) ||
        int.description?.toLowerCase().includes(term)
      );
    }

    if (this.selectedSeverity) {
      filtered = filtered.filter(int => int.severity === this.selectedSeverity);
    }

    this.filteredInteractions = filtered;
  }

  edit(id: number): void {
    this.router.navigate(["/drug-interactions/update", id]);
  }

  showDeleteModal(id: number): void {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.interactionService.remove(this.deleteId).subscribe({
      next: () => {
        this.toastr.success("Drug interaction deleted successfully!", "Success");
        this.loadInteractions();
      },
      error: () => {
        this.toastr.error("Error deleting drug interaction");
      },
    });
    this.removeItemModal?.hide();
  }
}
