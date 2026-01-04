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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private popup = inject(PopupService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Basic 10-digit validation
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


  // popupMessage = signal<string>('');
  // showPopup = signal<boolean>(false);
  // isLoading = signal<boolean>(false);

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     this.isLoading.set(true);

  //     this.authService.registerUser(this.registerForm.value).subscribe({
  //       next: (responseString) => {
  //         this.popupMessage.set(responseString);
  //         this.showPopup.set(true);
  //         this.isLoading.set(false);
  //         this.registerForm.reset();
  //       },
  //       error: (err) => {
  //         console.error('Registration failed', err);
  //         const errorMessage = typeof err.error === 'string' ? err.error : "Registration failed. Please try again.";
  //         this.popupMessage.set(errorMessage);
  //         this.showPopup.set(true);
  //         this.isLoading.set(false);
  //       }
  //     });
  //   } else {
  //     alert("Please fill the form correctly.");
  //   }
  // }
  // closePopup() {
  //   this.showPopup.set(false);
  // }
}