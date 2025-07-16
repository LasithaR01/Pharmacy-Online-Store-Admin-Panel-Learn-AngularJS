// src/app/stocks/stocks-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LowStockComponent } from "./low-stock/low-stock.component";
import { ExpiringSoonComponent } from "./expiring-soon/expiring-soon.component";

const routes: Routes = [
  {
    path: "low-stock",
    component: LowStockComponent,
  },
  {
    path: "expiring-soon",
    component: ExpiringSoonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
