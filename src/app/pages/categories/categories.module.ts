// src/app/pages/categories/categories.module.ts
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
import { CategoriesRoutingModule } from "./categories-routing.module";
import {CreateOrUpdateCategoryComponent} from "./create-or-update-category/create-or-update-category.component";


@NgModule({
  declarations: [ListComponent, CreateOrUpdateCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot(),
  ],
})
export class CategoriesModule {}
