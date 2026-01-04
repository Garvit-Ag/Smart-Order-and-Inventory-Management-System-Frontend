import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup';

@Component({
  selector: 'app-global-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (popup.isVisible()) {
      <div class="popup-overlay" (click)="popup.close()">
        <div class="popup-box" [ngClass]="popup.type()" (click)="$event.stopPropagation()">
          <div class="icon">
            @if (popup.type() === 'success') { ✓ }
            @if (popup.type() === 'error') { ⚠ }
            @if (popup.type() === 'info') { ℹ }
          </div>
          <div class="message">{{ popup.message() }}</div>
          <button class="close-btn" (click)="popup.close()">×</button>
        </div>
      </div>
    }
  `,
  styleUrls: ['./global-popup.css']
})
export class GlobalPopupComponent {
  popup = inject(PopupService);
}