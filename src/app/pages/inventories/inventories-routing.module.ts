// src/app/inventories/inventories-routing.module.ts

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import {CreateOrUpdateInventoryComponent} from "./create-or-update-inventory/create-or-update-inventory.component";


const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateInventoryComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateInventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoriesRoutingModule {}
