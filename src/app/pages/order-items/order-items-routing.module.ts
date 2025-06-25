// src/app/order-items/order-items-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdateOrderItemComponent } from "./create-or-update-order-item/create-or-update-order-item.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateOrderItemComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateOrderItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderItemsRoutingModule {}
