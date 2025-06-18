import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdateBranchComponent } from "./create-or-update/create-branch.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateBranchComponent,
  },
    {
    path: "update/:id",
    component: CreateOrUpdateBranchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
