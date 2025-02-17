import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
// import { CreateSupplierComponent } from './create-supplier/create-supplier.component';

const routes: Routes = [
  {
    path: '', // Default route for suppliers
    component: AllSuppliersComponent
  },
  // {
  //   path: 'create', // Route for creating a new supplier
  //   component: CreateSupplierComponent
  // },
  // {
  //   path: 'create/:id', // Route for editing an existing supplier by ID
  //   component: CreateSupplierComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use `forChild` for feature modules
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
