import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';
import { OrderTable, OrderItem } from '../../models/order.model';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private auth = inject(AuthService);

  orders = signal<OrderTable[]>([]);
  selectedOrderItems = signal<OrderItem[]>([]);
  selectedOrderId = signal<number | null>(null);
  showItemsModal = signal(false);

  ngOnInit() {
  const role = this.auth.currentUserRole();

  if (role === 'CUSTOMER') {
    this.orderService.getMyOrders()
      .subscribe(data => this.orders.set(data));
  } else {
    this.orderService.getAllOrders()
      .subscribe(data => this.orders.set(data));
  }
}


  // ngOnInit() {
  //   this.orderService.getAllOrders().subscribe(data => this.orders.set(data));
  // }

  viewItems(orderId: number) {
    this.orderService.getOrderItems(orderId).subscribe(items => {
      this.selectedOrderItems.set(items);
      this.selectedOrderId.set(orderId);
      this.showItemsModal.set(true);
    });
  }
}