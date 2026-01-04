import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  // Signals for UI state
  isVisible = signal(false);
  message = signal('');
  
  // A hidden variable to hold the "Promise resolver"
  private resolveRef: ((value: boolean) => void) | null = null;

  // CALL THIS METHOD FROM YOUR COMPONENTS
  ask(msg: string): Promise<boolean> {
    this.message.set(msg);
    this.isVisible.set(true);

    // Return a new Promise that waits for the user to click a button
    return new Promise<boolean>((resolve) => {
      this.resolveRef = resolve;
    });
  }

  // Called by the "Yes" button
  accept() {
    if (this.resolveRef) this.resolveRef(true);
    this.close();
  }

  // Called by the "No" button
  decline() {
    if (this.resolveRef) this.resolveRef(false);
    this.close();
  }

  private close() {
    this.isVisible.set(false);
    this.resolveRef = null;
  }
}