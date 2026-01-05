import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { PopupService } from '../../services/popup';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cart = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly popup = inject(PopupService);

  // Form Fields
  address: string = '';
  paymentMode: string = 'CASH';

  submitOrder() {
    if (!this.address.trim()) {
      this.popup.show("Delivery address is required", "error");
      return;
    }

    // BUILD THE ORDER DTO
    const orderDto = {
      address: this.address,
      amount: this.cart.totalPrice(),
      paymentMode: this.paymentMode,
      // Map CartItem[] to OrderItemDto[]
      items: this.cart.items().map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.orderService.createOrder(orderDto).subscribe({
      next: (response) => {
        this.popup.show(response, "success");
        this.cart.clear();
        this.address = '';
      },
      error: (err) => {
        console.log(err);
        this.popup.handleError(err, "Order Failed");
      }
    });
  }
}