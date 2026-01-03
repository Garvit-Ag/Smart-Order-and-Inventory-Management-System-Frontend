import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // 1. Create the Form
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Basic 10-digit validation
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  // 2. Signals for UI State
  popupMessage = signal<string>(''); // Stores the API response string
  showPopup = signal<boolean>(false); // Controls if popup is visible
  isLoading = signal<boolean>(false);

  // 3. Handle Form Submission
  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);

      // Call the API
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (responseString) => {
          // Success! API returned a string. Show it in popup.
          this.popupMessage.set(responseString);
          this.showPopup.set(true);
          this.isLoading.set(false);
          this.registerForm.reset(); // Clear the form
        },
        error: (err) => {
          // Handle error (e.g., server offline)
          console.error('Registration failed', err);
          this.popupMessage.set("Registration failed. Please try again.");
          this.showPopup.set(true);
          this.isLoading.set(false);
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }

  // 4. Close Popup
  closePopup() {
    this.showPopup.set(false);
  }
}