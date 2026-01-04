import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { GlobalPopupComponent } from './components/global-popup/global-popup';
import { GlobalConfirmationComponent } from './components/global-confirmation/global-confirmation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, GlobalPopupComponent, GlobalConfirmationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smart-inventory');
}
