import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, } from '@angular/common';
import { ProductService } from '../../services/product';
import { PopupService } from '../../services/popup';
import { ConfirmationService } from '../../services/confirmation';
import { Product } from '../../models/product.model';
import { InputDialogService } from '../../services/inputdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  private productService = inject(ProductService);
  private popup = inject(PopupService);
  private confirm = inject(ConfirmationService);
  private inputDialog = inject(InputDialogService);
  private fb = inject(FormBuilder);
  showAddModal = signal(false); // Signal to toggle modal

  products = signal<Product[]>([]);

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  async changePrice(id: number) {
    const newPrice = await this.inputDialog.ask('Enter Price', 'e.g., 99.99', 'number');
    if (newPrice && !isNaN(Number(newPrice))) {
        this.productService.updatePrice(id, Number(newPrice)).subscribe({
          next: (msg) => {
            this.popup.show(msg, 'success');
            this.loadProducts(); // Refresh list
          },
          error: (err) => this.popup.handleError(err,"Failed to update price")
        });
    }
  }

  async changeStock(id: number) {
    const newStock = await this.inputDialog.ask('Enter Stock', 'e.g., 25', 'number');
    if (newStock && !isNaN(Number(newStock))) {
      if (!Number.isInteger(Number(newStock))) {
        this.popup.error('Stock quantity must be a whole number');
        return;
      }
      this.productService.updateStock(id, Number(newStock)).subscribe({
        next: (msg) => {
          this.popup.show(msg, 'success');
          this.loadProducts();
        },
        error: (err) => this.popup.handleError(err,"Failed to update stock")
      });
    }
  }

  async deleteProduct(id: number, name: string){
    const confirmed = await this.confirm.ask(`Are you sure u want to delete ${name}?`);
    if(confirmed){
      this.productService.deleteProduct(id).subscribe({
          next: (msg) => {
            this.popup.show(msg, 'success');
            this.loadProducts(); // Refresh list
          },
          error: (err) => this.popup.handleError(err,"Failed to update price")
        });
    }
  }

  // Define the form
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    url: [''],
    description: [''],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  // Method to save product
  saveProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (msg) => {
          this.popup.show(msg, 'success');
          this.showAddModal.set(false); // Close modal
          this.productForm.reset();     // Clear form
          this.loadProducts();          // Refresh list
        },
        error: () => this.popup.show("Failed to add product", "error")
      });
    }
  }
}