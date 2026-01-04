import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { BillingComponent } from './components/billing/billing';
import { InventoryComponent } from './components/inventory/inventory';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/billing', component: BillingComponent },
  { path: 'finance/billing', component: BillingComponent },
  { path: 'admin/inventory', component: InventoryComponent },
  { path: 'manager/inventory', component: InventoryComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'sales/orders', component: AdminOrdersComponent }
];