import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Signal to store cart items
  cartItems = signal<Product[]>([]);

  // Computed signals for automatic updates
  totalItems = computed(() => this.cartItems().length);
  totalPrice = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.price, 0)
  );

  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(p => p.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}