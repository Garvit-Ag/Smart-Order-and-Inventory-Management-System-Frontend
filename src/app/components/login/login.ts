import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { PopupService } from '../../services/popup';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private popup = inject(PopupService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = signal(false);

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.popup.success("Login successful! Welcome back.");
          this.isLoading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.popup.handleError(err, "Invalid email or password");
          this.isLoading.set(false);
        }
      });
    } else {
      this.popup.error("Please fill in all required fields correctly.");
    }
  }
}