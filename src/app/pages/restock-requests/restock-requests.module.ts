// src/app/restock-requests/restock-requests.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DndModule } from "ngx-drag-drop";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ListComponent } from "./list/list.component";
import { RestockRequestsRoutingModule } from "./restock-requests-routing.module";
import { CreateOrUpdateRestockRequestComponent } from './create-or-update-restock-request/create-or-update-restock-request.component';
import {UIModule} from "../../shared/ui/ui.module";

@NgModule({
  declarations: [ListComponent, CreateOrUpdateRestockRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RestockRequestsRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    DndModule,
    BsDropdownModule.forRoot(),
  ],
})
export class RestockRequestsModule {}
