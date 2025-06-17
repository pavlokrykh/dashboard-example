import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '@shared/components/icon/icon.component';

export interface NavigationTab {
  label: string;
  route: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  $tabs = input<NavigationTab[]>([], { alias: 'tabs' });
}
