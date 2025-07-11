// src/app/customers/customers-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { CreateOrUpdateCustomerComponent } from "./create-or-update-customer/create-or-update-customer.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateCustomerComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
