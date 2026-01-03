import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private loginUrl = 'http://localhost:8765/auth/login';

  // Signals to keep track of the user globally
  currentUserRole = signal<string | null>(localStorage.getItem('role'));
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: any): Observable<string> {
    return this.http.post(this.loginUrl, credentials, { responseType: 'text' }).pipe(
      tap(token => {
        // 1. Save Token to LocalStorage
        localStorage.setItem('token', token);
        
        // 2. Decode the token to get the Role
        const decoded: any = jwtDecode(token);
        const role = decoded.role; // This matches your .claim("role", ...)
        
        // 3. Update Signals
        localStorage.setItem('role', role);
        this.currentUserRole.set(role);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserRole.set(null);
    this.isLoggedIn.set(false);
  }
  private apiUrl = 'http://localhost:8765/auth/register';

  constructor() {}

  registerUser(userData: any): Observable<string> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }
}