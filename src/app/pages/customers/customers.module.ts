// src/app/customers/customers.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "../../shared/ui/ui.module";
import { ListComponent } from "./list/list.component";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CreateOrUpdateCustomerComponent } from './create-or-update-customer/create-or-update-customer.component';

@NgModule({
  declarations: [ListComponent, CreateOrUpdateCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    UIModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
})
export class CustomersModule {}
