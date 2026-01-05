import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  productId: number;
  name: string;     
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  totalPrice = computed(() => 
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  totalCount = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(product: Product) {
    const currentItems = this.items();
    const existingItem = currentItems.find(i => i.productId === product.id);

    if (existingItem) {
      this.items.update(items => items.map(i => 
        i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
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