// src/app/drug-interactions/drug-interactions.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgApexchartsModule } from "ng-apexcharts";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DndModule } from "ngx-drag-drop";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { UIModule } from "../../shared/ui/ui.module";
import { ListComponent } from "./list/list.component";
import { DrugInteractionsRoutingModule } from "./drug-interactions-routing.module";
import { CreateOrUpdateDrugInteractionComponent } from './create-or-update-drug-interaction/create-or-update-drug-interaction.component';

@NgModule({
  declarations: [ListComponent, CreateOrUpdateDrugInteractionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrugInteractionsRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot(),
  ],
})
export class DrugInteractionsModule {}
