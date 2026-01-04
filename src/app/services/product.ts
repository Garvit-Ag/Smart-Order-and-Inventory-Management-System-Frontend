import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8765/product';
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  deleteProduct(id: number): Observable<string>{
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }

  // Note: Using HttpParams because your backend uses @RequestParam
  updatePrice(id: number, price: number): Observable<string> {
    const params = new HttpParams().set('price', price.toString());
    return this.http.put(`${this.baseUrl}/update/price/${id}`, {}, { params, responseType: 'text' });
  }

  updateStock(id: number, stock: number): Observable<string> {
    const params = new HttpParams().set('stock', stock.toString());
    return this.http.put(`${this.baseUrl}/update/stock/${id}`, {}, { params, responseType: 'text' });
  }

  addProduct(productData: any): Observable<string> {
  // Sending JSON object as RequestBody
  return this.http.post(`${this.baseUrl}/add`, productData, { responseType: 'text' });
}
}