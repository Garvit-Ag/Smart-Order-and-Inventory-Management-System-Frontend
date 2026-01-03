import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  // 1. Define State using Signals (Mocking data for now)
  // Change these values to test different views: 'GUEST', 'CUSTOMER', 'ADMIN'
  userRole = signal<string>('GUEST'); 
  isLoggedIn = signal<boolean>(false);

  constructor() {}

  // 2. Simple Logout Action
  logout() {
    this.isLoggedIn.set(false);
    this.userRole.set('GUEST');
    // In a real app, you would also route the user back to login here
  }
}