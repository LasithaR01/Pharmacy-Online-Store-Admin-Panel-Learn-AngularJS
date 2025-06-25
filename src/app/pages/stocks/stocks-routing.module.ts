// src/app/stocks/stocks-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { CreateOrUpdateStockComponent } from "./create-or-update-stock/create-or-update-stock.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateStockComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateStockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
