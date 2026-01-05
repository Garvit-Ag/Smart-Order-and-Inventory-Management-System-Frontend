import { Injectable, signal } from '@angular/core';

export type PopupType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  isVisible = signal(false);
  message = signal('');
  type = signal<PopupType>('info');

  show(msg: string, type: PopupType = 'info') {
    this.message.set(msg);
    this.type.set(type);
    this.isVisible.set(true);
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.isVisible.set(false);
  }

  //Centralized error handler for HTTP errors
  //Extracts user-friendly error messages from various error formats

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
      if (typeof err.error === 'string' && err.error.length < 200) {
        errorMessage = err.error;
      } else if (err.error.message && typeof err.error.message === 'string') {
        errorMessage = err.error.message;
      }
    }
    
    this.show(errorMessage, 'error');
  }

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