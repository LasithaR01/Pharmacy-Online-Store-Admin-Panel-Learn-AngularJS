// src/app/alerts/alerts.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UIModule } from '../../shared/ui/ui.module';
import { ListComponent } from './list/list.component';
import { AlertsRoutingModule } from './alerts-routing.module';
import { CreateOrUpdateAlertComponent } from './create-or-update-alert/create-or-update-alert.component';

@NgModule({
  declarations: [ListComponent, CreateOrUpdateAlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsRoutingModule,
    UIModule,
    NgApexchartsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ]
})
export class AlertsModule { }
