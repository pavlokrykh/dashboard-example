import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './features/layout/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected title = 'dashboard-example';
}
