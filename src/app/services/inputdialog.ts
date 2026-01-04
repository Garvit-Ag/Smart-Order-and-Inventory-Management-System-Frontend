import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {
  isVisible = signal(false);
  title = signal('');
  placeholder = signal('');
  inputValue = signal('');
  inputType = signal<'text' | 'number'>('text');
  
  private resolveRef: ((value: string | null) => void) | null = null;

  ask(title: string, placeholder: string = '', type: 'text' | 'number' = 'text'): Promise<string | null> {
    this.title.set(title);
    this.placeholder.set(placeholder);
    this.inputType.set(type);
    this.inputValue.set('');
    this.isVisible.set(true);

    return new Promise<string | null>((resolve) => {
      this.resolveRef = resolve;
    });
  }

  submit() {
    const value = this.inputValue().trim();
    if (this.resolveRef) {
      this.resolveRef(value || null);
    }
    this.close();
  }

  cancel() {
    if (this.resolveRef) {
      this.resolveRef(null);
    }
    this.close();
  }

  private close() {
    this.isVisible.set(false);
    this.inputValue.set('');
    this.resolveRef = null;
  }
}