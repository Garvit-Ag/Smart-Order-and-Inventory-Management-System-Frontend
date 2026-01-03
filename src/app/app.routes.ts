import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent }
];