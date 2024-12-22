import { NgModule } from '@angular/core';

// layouts
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

import { CardLineChartComponent } from './components/cards/card-line-chart/card-line-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationDropdownComponent } from './components/dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { TablesComponent } from './views/admin/tables/tables.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { CardSettingsComponent } from './components/cards/card-settings/card-settings.component';
import { CardProfileComponent } from './components/cards/card-profile/card-profile.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { appConfig } from './app.config';
import { ButtonComponent } from './components/ui/button/button.component';
import { TableComponent } from './components/ui/table/table.component';
import { ProductsComponent } from './views/admin/products/products.component';
import { CategoriesComponent } from './views/admin/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    TableDropdownComponent,
    TablesComponent,
    CardTableComponent,
    AdminNavbarComponent,
    CardStatsComponent,
    HeaderStatsComponent,
    FooterAdminComponent,
    CardSettingsComponent,
    CardProfileComponent,
    SettingsComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ButtonComponent, TableComponent],
  providers: [...(appConfig.providers || [])], // Spread providers into AppModule
  bootstrap: [AppComponent],
})
export class AppModule {}
