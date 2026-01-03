import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // In Angular 21, we use inject() instead of the constructor for cleaner code
  private http = inject(HttpClient);
  
  // Your API Endpoint
  private apiUrl = 'http://localhost:8765/auth/register';

  constructor() {}

  // Function to register a user
  // We use 'any' for the data here, but in a real app, use an Interface
  registerUser(userData: any): Observable<string> {
    // We expect a text response (string), so we set responseType: 'text'
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }
}