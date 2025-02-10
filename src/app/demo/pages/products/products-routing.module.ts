import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./all-products/all-products.component').then((m) => m.AllProductsComponent) // Access the component correctly
      },
      {
        path: 'create',
        loadComponent: () => import('./create-update/create-update.component').then((m) => m.CreateComponent) // Access the component correctly
      },
      {
        path: 'create/:slug', // For editing an existing product (based on the product slug)
        loadComponent: () => import('./create-update/create-update.component').then((m) => m.CreateComponent) // Access the component correctly
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
