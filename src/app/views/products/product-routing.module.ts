import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
    ],
  },

  // { path: 'create', component: ProductFormComponent },         // Create a product
  // { path: 'edit/:id', component: ProductFormComponent },       // Edit a product
  // { path: ':id', component: ProductDetailsComponent },         // View product details
];
