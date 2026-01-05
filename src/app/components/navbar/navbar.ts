import { Component, inject, signal } from '@angular/core'; // Added inject
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Import your service
import { ConfirmationService } from '../../services/confirmation';
import { PopupService } from '../../services/popup';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  public auth = inject(AuthService);
  private readonly router = inject(Router);
  confirmation = inject(ConfirmationService);
  popup = inject(PopupService)
  cart = inject(CartService);

  constructor() {}

  showDropdown = signal(false);
  get user() {
    return this.auth.getUserInfo();
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }

async deleteAccount() {
    const isConfirmed = await this.confirmation.ask(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, orders, and account information."
    );

    if (isConfirmed) {
      this.auth.deleteAccount().subscribe({
        next: (response) => {
          console.log('Delete response:', response);
          this.popup.success('Your account has been successfully deleted.');
          this.showDropdown = signal(false);
          this.auth.logout();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.popup.handleError(err, 'Failed to delete account. Please try again or contact support.');
        }
      });
    }
  }


 async logout() {
    const isConfirmed = await this.confirmation.ask("Are you sure you want to log out?");
    if (isConfirmed) {
      this.showDropdown = signal(false);
      this.auth.logout();
    }
  }
  
}
