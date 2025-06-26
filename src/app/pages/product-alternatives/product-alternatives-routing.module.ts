// src/app/product-alternatives/product-alternatives-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdateProductAlternativeComponent } from "./create-or-update-product-alternative/create-or-update-product-alternative.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateProductAlternativeComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateProductAlternativeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAlternativesRoutingModule {}
