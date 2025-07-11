// src/app/orders/orders-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { CreateOrUpdateOrderComponent } from "./create-or-update-order/create-or-update-order.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateOrderComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateOrderComponent,
  },
  {
    path: "detail/:id",
    component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
