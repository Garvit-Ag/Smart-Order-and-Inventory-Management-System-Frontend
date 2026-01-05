import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  isVisible = signal(false);
  message = signal('');
  
  private resolveRef: ((value: boolean) => void) | null = null;

  ask(msg: string): Promise<boolean> {
    this.message.set(msg);
    this.isVisible.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolveRef = resolve;
    });
  }

  accept() {
    if (this.resolveRef) this.resolveRef(true);
    this.close();
  }

  decline() {
    if (this.resolveRef) this.resolveRef(false);
    this.close();
  }

  private close() {
    this.isVisible.set(false);
    this.resolveRef = null;
  }
}