// src/app/stocks/stocks.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "../../shared/ui/ui.module";
import { LowStockComponent } from "./low-stock/low-stock.component";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ExpiringSoonComponent } from "./expiring-soon/expiring-soon.component";

@NgModule({
  declarations: [LowStockComponent, ExpiringSoonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
})
export class ReportsModule {}
