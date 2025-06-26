// src/app/alerts/alerts-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateOrUpdateAlertComponent } from './create-or-update-alert/create-or-update-alert.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'create',
    component: CreateOrUpdateAlertComponent
  },
  {
    path: 'update/:id',
    component: CreateOrUpdateAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
