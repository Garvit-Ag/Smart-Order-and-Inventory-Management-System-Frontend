import { Component, inject, signal } from '@angular/core'; // Added inject
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Import your service
import { ConfirmationService } from '../../services/confirmation';
import { PopupService } from '../../services/popup';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  public auth = inject(AuthService);
  private router = inject(Router);
  confirmation = inject(ConfirmationService);
  popup = inject(PopupService)

  constructor() {}

  showDropdown = signal(false);
  get user() {
    return this.auth.getUserInfo();
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }

async deleteAccount() {
    // 1. Ask for confirmation
    const isConfirmed = await this.confirmation.ask(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, orders, and account information."
    );

    // 2. If confirmed, proceed with deletion
    if (isConfirmed) {
      this.auth.deleteAccount().subscribe({
        next: (response) => {
          console.log('Delete response:', response); // Debug log
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
    // If they clicked Cancel, nothing happens
  }


 async logout() {
    // 1. Ask the question
    const isConfirmed = await this.confirmation.ask("Are you sure you want to log out?");

    // 2. Check the answer
    if (isConfirmed) {
      this.showDropdown = signal(false);
      this.auth.logout();
    }
    // If they clicked Cancel, nothing happens.
  }
  
}
