import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputDialogService } from '../../services/inputdialog';

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inputdialog.html',
  styleUrl: './inputdialog.css'
})
export class InputDialogComponent {
  dialog = inject(InputDialogService);
}