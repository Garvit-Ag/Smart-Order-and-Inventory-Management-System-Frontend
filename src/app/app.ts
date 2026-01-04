import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { GlobalPopupComponent } from './components/global-popup/global-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, GlobalPopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smart-inventory');
}
