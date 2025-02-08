import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./all-categories/all-categories.component').then(m => m.AllCategoriesComponent) // Access the component correctly
      },
      {
        path: 'create',
        loadComponent: () => import('./create/create.component').then(m => m.CreateComponent) // Access the component correctly
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
