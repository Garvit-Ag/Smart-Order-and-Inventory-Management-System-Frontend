import { Injectable, signal } from '@angular/core';

export type PopupType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  // Signals to control the state
  isVisible = signal(false);
  message = signal('');
  type = signal<PopupType>('info');

  // Method to show the popup
  show(msg: string, type: PopupType = 'info') {
    this.message.set(msg);
    this.type.set(type);
    this.isVisible.set(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.isVisible.set(false);
  }

  /**
   * Centralized error handler for HTTP errors
   * Extracts user-friendly error messages from various error formats
   */
  handleError(err: any, customMessage?: string) {
    let errorMessage = customMessage || "An error occurred. Please try again.";
    
    // Handle different error scenarios
    if (err.status === 0) {
      errorMessage = "Unable to connect to server. Please check your connection.";
    } else if (err.status === 503) {
      errorMessage = "Service temporarily unavailable. Please try again later.";
    } else if (err.status === 401) {
      errorMessage = "Unauthorized. Please login again.";
    } else if (err.status === 403) {
      errorMessage = "Access denied.";
    } else if (err.status === 404) {
      errorMessage = "Resource not found.";
    } else if (err.status >= 500) {
      errorMessage = "Server error. Please try again later.";
    } else if (err.error) {
      // Try to extract custom error message from server
      if (typeof err.error === 'string' && err.error.length < 200) {
        errorMessage = err.error;
      } else if (err.error.message && typeof err.error.message === 'string') {
        errorMessage = err.error.message;
      }
    }
    
    this.show(errorMessage, 'error');
  }

  /**
   * Convenience methods for common popup types
   */
  success(message: string) {
    this.show(message, 'success');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  error(message: string) {
    this.show(message, 'error');
  }
}