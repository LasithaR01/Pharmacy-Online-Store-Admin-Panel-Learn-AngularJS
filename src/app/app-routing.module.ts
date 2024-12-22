import { RouterModule, Routes } from '@angular/router';

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
// import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { NgModule } from '@angular/core';
import { TablesComponent } from './views/admin/tables/tables.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { ProductsComponent } from './views/admin/products/products.component';
import { CategoriesComponent } from './views/admin/categories/categories.component';

export const routes: Routes = [
      // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "products", component: ProductsComponent },
      { path: "categories", component: CategoriesComponent },

    //   { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

