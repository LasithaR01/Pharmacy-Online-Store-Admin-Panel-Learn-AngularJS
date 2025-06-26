// src/app/product-alternatives/product-alternatives.module.ts
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
import { ProductAlternativesRoutingModule } from "./product-alternatives-routing.module";
import { CreateOrUpdateProductAlternativeComponent } from './create-or-update-product-alternative/create-or-update-product-alternative.component';

@NgModule({
  declarations: [ListComponent, CreateOrUpdateProductAlternativeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductAlternativesRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot(),
  ],
})
export class ProductAlternativesModule {}
