import { Component, inject, signal } from '@angular/core'; // Added inject
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  private router = inject(Router);

  constructor() {}

  showDropdown = signal(false);
  get user() {
    return this.auth.getUserInfo();
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }

  // deleteAccount() {
  //   const confirmed = confirm(
  //     'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, orders, and account information.'
  //   );
    
  //   if (confirmed) {
  //     this.auth.deleteAccount().subscribe({
  //       next: (response) => {
  //         alert('Your account has been successfully deleted.');
  //         this.logout();
  //         this.router.navigate(['/home']);
  //       },
  //       error: (error) => {
  //         console.error('Error deleting account:', error);
  //         alert('Failed to delete account. Please try again or contact support.');
  //       }
  //     });
  //   }
  // }

  showConfirmPopup = false;
showSuccessPopup = false;
showErrorPopup = false;

deleteAccountConfirmed() {
  this.auth.deleteAccount().subscribe({
    next: () => {
      this.showConfirmPopup = false;
      this.showSuccessPopup = true;

      setTimeout(() => {
        this.showSuccessPopup = false;
        this.logout();
        this.router.navigate(['/home']);
      }, 2000);
    },
    error: () => {
      this.showConfirmPopup = false;
      this.showErrorPopup = true;

      setTimeout(() => {
        this.showErrorPopup = false;
      }, 3000);
    }
  });
}

openDeletePopup() {
  this.showConfirmPopup = true;
}

closePopup() {
  this.showConfirmPopup = false;
}


  logout() {
    this.showDropdown = signal(false);
    this.auth.logout();
  }
  
}
