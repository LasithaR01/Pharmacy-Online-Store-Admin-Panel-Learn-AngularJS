// src/app/prescriptions/prescriptions-routing.module.ts

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdatePrescriptionComponent } from "./create-or-update-prescription/create-or-update-prescription.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdatePrescriptionComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdatePrescriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionsRoutingModule {}
