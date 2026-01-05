import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8765/auth';
  router = inject(Router);

  //register
  registerUser(userData: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }

  //login
  currentUserRole = signal<string | null>(localStorage.getItem('role'));
  currentUserEmail = signal<string | null>(localStorage.getItem('email'));
  currentUserId = signal<string | null>(localStorage.getItem('userId'));

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: any): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem('token', token);

          const decoded: any = jwtDecode(token);

          const role = decoded.role;
          const email = decoded.sub;
          const userId = decoded.userId;

          localStorage.setItem('role', role);
          localStorage.setItem('email', email);
          localStorage.setItem('userId', userId);

          this.currentUserRole.set(role);
          this.currentUserEmail.set(email);
          this.currentUserId.set(userId);
          this.isLoggedIn.set(true);
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  //profile
  getUserInfo() {
    return {
      email: this.currentUserEmail(),     
      id: this.currentUserId(),      
      role: this.currentUserRole()      
    }
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`);
  }

  //logout
  logout() {
    this.router.navigate(['/home']);
    localStorage.clear();
    this.currentUserRole.set(null);
    this.currentUserEmail.set(null);
    this.currentUserId.set(null);
    this.isLoggedIn.set(false);
  }

}