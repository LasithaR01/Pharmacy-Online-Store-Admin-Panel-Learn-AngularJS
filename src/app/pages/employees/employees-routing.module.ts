// src/app/employees/employees-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { CreateOrUpdateEmployeeComponent } from "./create-or-update-employee/create-or-update-employee.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateEmployeeComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
