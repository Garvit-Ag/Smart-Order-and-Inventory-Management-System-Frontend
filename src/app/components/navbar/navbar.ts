import { Component, inject, signal } from '@angular/core'; // Added inject
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Import your service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  public auth = inject(AuthService);

  constructor() {}

  showDropdown = signal(false);
  get user() {
    return this.auth.getUserInfo();
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }

  logout() {
    this.showDropdown = signal(false);
    this.auth.logout();
  }

  
}
