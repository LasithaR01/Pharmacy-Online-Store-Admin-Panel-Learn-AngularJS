// src/app/restock-requests/restock-requests-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { CreateOrUpdateRestockRequestComponent } from "./create-or-update-restock-request/create-or-update-restock-request.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateRestockRequestComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateRestockRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestockRequestsRoutingModule {}
