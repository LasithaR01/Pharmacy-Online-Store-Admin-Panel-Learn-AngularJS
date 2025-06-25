// src/app/stocks/stocks.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "../../shared/ui/ui.module";
import { ListComponent } from "./list/list.component";
import { StocksRoutingModule } from "./stocks-routing.module";
import { CreateOrUpdateStockComponent } from './create-or-update-stock/create-or-update-stock.component';

@NgModule({
  declarations: [ListComponent, CreateOrUpdateStockComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StocksRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
})
export class StocksModule {}
