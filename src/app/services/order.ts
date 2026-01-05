import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderTable, OrderItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8765/order';

  getAllOrders(): Observable<OrderTable[]> {
    return this.http.get<OrderTable[]>(`${this.baseUrl}/get`);
  }

  getOrderItems(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/${orderId}`);
  }

  placeOrder(orderDto: any): Observable<string> {
    return this.http.post(this.baseUrl, orderDto, { responseType: 'text' });
  }
  
  getMyOrders(): Observable<OrderTable[]> {
    return this.http.get<OrderTable[]>(`${this.baseUrl}`); 
  }

  createOrder(orderDto: any): Observable<string> {
    return this.http.post(this.baseUrl, orderDto, { responseType: 'text' });
  }
}