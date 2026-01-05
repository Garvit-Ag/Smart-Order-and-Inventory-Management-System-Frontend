import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopupService } from '../../services/popup';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly popup = inject(PopupService);
  private readonly router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  isLoading = signal<boolean>(false);
  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.registerUser(this.registerForm.value).subscribe({
  next: (response) => {
    this.popup.success("Registration Successful! Please login.");
    this.isLoading.set(false);
    this.router.navigate(['/login']);
  },
  error: (err) => {
    this.popup.handleError(err, "Registration failed. Please try again.");
    this.isLoading.set(false);
  }
});
    } else {
      this.popup.show("Please fix the errors in the form.", "error");
    }
  }
}