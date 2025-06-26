// src/app/drug-interactions/create-or-update-drug-interaction/create-or-update-drug-interaction.component.ts
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DrugInteraction, InteractionSeverity } from "src/app/core/models/drug-interaction.model";
import { DrugInteractionService } from "src/app/core/services/drug-interaction.service";

@Component({
  selector: "app-create-drug-interaction",
  templateUrl: "./create-or-update-drug-interaction.component.html",
  styleUrls: ["./create-or-update-drug-interaction.component.scss"],
})
export class CreateOrUpdateDrugInteractionComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  interactionId: number | null = null;
  severityOptions = Object.values(InteractionSeverity);

  // bread crumb items
  breadCrumbItems: Array<{}>;
  interactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private interactionService: DrugInteractionService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Create Drug Interaction", active: true },
    ];

    this.interactionForm = this.fb.group({
      productId: ["", Validators.required],
      interactsWithId: ["", Validators.required],
      severity: ["", Validators.required],
      description: ["", Validators.required],
      clinicalManagement: [""],
      evidenceLevel: [""]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.interactionId = +id;
        this.isEditMode = true;
        this.loadInteraction();
      }
    });
  }

  loadInteraction() {
    this.interactionService.getById(this.interactionId!).subscribe({
      next: (interaction) => {
        this.interactionForm.patchValue(interaction);
      },
      error: () => {
        this.toastr.error("Error loading drug interaction");
      },
    });
  }

  onSubmit(): void {
    // Mark all controls as touched to show validation
    Object.values(this.interactionForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.interactionForm.invalid) return;

    const formData = this.interactionForm.value;

    if (this.isEditMode && this.interactionId) {
      this.interactionService
        .update(this.interactionId, formData)
        .subscribe({
          next: () => {
            this.toastr.success("Drug interaction updated successfully!", "Success");
            this.router.navigate(["/drug-interactions/list"]);
          },
          error: () => {
            this.toastr.error("Error updating drug interaction!", "Error");
          },
        });
    } else {
      this.interactionService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Drug interaction created successfully!", "Success");
          this.router.navigate(["/drug-interactions/list"]);
          this.interactionForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating drug interaction!", "Error");
        },
      });
    }
  }
}
