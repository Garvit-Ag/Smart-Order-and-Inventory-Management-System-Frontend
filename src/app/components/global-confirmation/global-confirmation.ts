import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from '../../services/confirmation';

@Component({
  selector: 'app-global-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (confirmService.isVisible()) {
      <div class="modal-overlay">
        <div class="modal-box">
          <h3>Confirmation</h3>
          <p>{{ confirmService.message() }}</p>
          
          <div class="actions">
            <button class="btn-no" (click)="confirmService.decline()">Cancel</button>
            <button class="btn-yes" (click)="confirmService.accept()">Yes, Proceed</button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./global-confirmation.css']
})
export class GlobalConfirmationComponent {
  confirmService = inject(ConfirmationService);
}