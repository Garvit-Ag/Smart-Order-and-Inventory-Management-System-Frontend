import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  
  //register
  private apiUrl = 'http://localhost:8765/auth/register';
  registerUser(userData: any): Observable<string> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }

  //login
  private loginUrl = 'http://localhost:8765/auth/login';
  currentUserRole = signal<string | null>(localStorage.getItem('role'));
  currentUserEmail = signal<string | null>(localStorage.getItem('email'));
  currentUserId = signal<string | null>(localStorage.getItem('userId'));

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: any): Observable<string> {
    return this.http
      .post(this.loginUrl, credentials, { responseType: 'text' })
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

  //profile
  getUserInfo() {
    return {
      email: this.currentUserEmail(),      // Subject (set in your Jwts.builder)
      id: this.currentUserId(),      // Claim "userId"
      role: this.currentUserRole()       // Claim "role"
    }
  }

  //logout
  logout() {
    localStorage.clear();
    this.currentUserRole.set(null);
    this.currentUserEmail.set(null);
    this.currentUserId.set(null);
    this.isLoggedIn.set(false);
  }

}