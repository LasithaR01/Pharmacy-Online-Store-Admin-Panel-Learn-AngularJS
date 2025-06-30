import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DefaultComponent
  },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },

  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'branches', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule) },
  { path: 'inventories', loadChildren: () => import('./inventories/inventories.module').then(m => m.InventoriesModule) },
  { path: 'stocks', loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'order-items', loadChildren: () => import('./order-items/order-items.module').then(m => m.OrderItemsModule) },
  { path: 'prescriptions', loadChildren: () => import('./prescriptions/prescriptions.module').then(m => m.PrescriptionsModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
  { path: 'restock-requests', loadChildren: () => import('./restock-requests/restock-requests.module').then(m => m.RestockRequestsModule) },
  { path: 'product-alternatives', loadChildren: () => import('./product-alternatives/product-alternatives.module').then(m => m.ProductAlternativesModule) },
  { path: 'drug-interactions', loadChildren: () => import('./drug-interactions/drug-interactions.module').then(m => m.DrugInteractionsModule) },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersModule) },


 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
