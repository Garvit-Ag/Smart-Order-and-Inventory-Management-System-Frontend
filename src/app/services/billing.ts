import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8765/bill';

  // No headers needed here! Your AuthInterceptor handles the token automatically.
  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }
}