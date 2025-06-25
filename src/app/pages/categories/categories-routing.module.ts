// src/app/pages/categories/categories-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import {CreateOrUpdateCategoryComponent} from "./create-or-update-category/create-or-update-category.component";


const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateOrUpdateCategoryComponent,
  },
  {
    path: "update/:id",
    component: CreateOrUpdateCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
