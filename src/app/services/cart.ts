import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

// This matches your OrderItemDto structure
export interface CartItem {
  productId: number;
  name: string;      // For UI display
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // The master list of items in the cart
  items = signal<CartItem[]>([]);

  // Automatically calculate total price whenever items change
  totalPrice = computed(() => 
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  // Automatically count total physical items
  totalCount = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(product: Product) {
    const currentItems = this.items();
    const existingItem = currentItems.find(i => i.productId === product.id);

    if (existingItem) {
      // If product exists, increase quantity
      this.items.update(items => items.map(i => 
        i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      // If new, add to list
      this.items.update(items => [...items, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  }

  updateQuantity(productId: number, delta: number) {
    this.items.update(items => items.map(i => {
      if (i.productId === productId) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }));
  }

  removeItem(productId: number) {
    this.items.update(items => items.filter(i => i.productId !== productId));
  }

  clear() {
    this.items.set([]);
  }
}