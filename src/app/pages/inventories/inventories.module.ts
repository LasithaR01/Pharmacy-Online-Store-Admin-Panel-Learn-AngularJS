// src/app/inventories/inventories.module.ts

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
import { InventoriesRoutingModule } from "./inventories-routing.module";
import {CreateOrUpdateInventoryComponent} from "./create-or-update-inventory/create-or-update-inventory.component";


@NgModule({
  declarations: [ListComponent, CreateOrUpdateInventoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InventoriesRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot(),
  ],
})
export class InventoriesModule {}
