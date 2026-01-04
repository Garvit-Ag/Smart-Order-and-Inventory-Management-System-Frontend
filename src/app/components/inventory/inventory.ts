import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { PopupService } from '../../services/popup';
import { ConfirmationService } from '../../services/confirmation';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  private productService = inject(ProductService);
  private popup = inject(PopupService);
  private confirm = inject(ConfirmationService);

  products = signal<Product[]>([]);

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  async changePrice(id: number) {
    const newPrice = prompt("Enter new price:");
    if (newPrice && !isNaN(Number(newPrice))) {
      const confirmed = await this.confirm.ask(`Update price to $${newPrice}?`);
      if (confirmed) {
        this.productService.updatePrice(id, Number(newPrice)).subscribe({
          next: (msg) => {
            this.popup.show(msg, 'success');
            this.loadProducts(); // Refresh list
          },
          error: (err) => this.popup.handleError(err,"Failed to update price")
        });
      }
    }
  }

  async changeStock(id: number) {
    const newStock = prompt("Enter new stock quantity:");
    if (newStock && !isNaN(Number(newStock))) {
      this.productService.updateStock(id, Number(newStock)).subscribe({
        next: (msg) => {
          this.popup.show(msg, 'success');
          this.loadProducts();
        },
        error: (err) => this.popup.handleError(err,"Failed to update stock")
      });
    }
  }
}