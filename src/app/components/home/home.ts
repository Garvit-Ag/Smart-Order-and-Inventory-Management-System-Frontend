import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Application Data using Signals
  companyName = signal('SmartLogistics Solutions');
  companyMission = signal('Streamlining global inventory with AI-driven precision.');
  
  // Statistics
  totalOrders = signal(15420);
  customersServed = signal(3200);
  warehouses = signal(12);
  activeUsers = signal(850);

  constructor() {}
}