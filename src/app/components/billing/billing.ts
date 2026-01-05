import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Important Pipes
import { BillingService } from '../../services/billing';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe], // Import pipes for formatting
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class BillingComponent implements OnInit {
  private readonly billingService = inject(BillingService);

  // Signals for state
  bills = signal<Bill[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    this.isLoading.set(true);
    
    this.billingService.getAllBills().subscribe({
      next: (data) => {
        this.bills.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching bills', err);
        this.errorMessage.set('Could not load billing data. Server might be down.');
        this.isLoading.set(false);
      }
    });
  }
}