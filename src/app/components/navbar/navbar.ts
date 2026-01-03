import { Component, inject } from '@angular/core'; // Added inject
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
  // Inject the AuthService
  // This gives you access to the signals: auth.isLoggedIn and auth.currentUserRole
  public auth = inject(AuthService);

  constructor() {}

  logout() {
    // Call the central logout logic in the service
    this.auth.logout();
  }
}
