// src/app/drug-interactions/drug-interactions-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdateDrugInteractionComponent } from "./create-or-update-drug-interaction/create-or-update-drug-interaction.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateDrugInteractionComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateDrugInteractionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugInteractionsRoutingModule {}
