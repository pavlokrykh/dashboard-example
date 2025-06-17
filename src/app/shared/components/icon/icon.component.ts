import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { IconService } from '@shared/services/icon.service';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  template: '<span class="icon" [innerHTML]="$svgIcon()"></span>',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  private readonly iconService = inject(IconService);

  $name = input.required<string>({ alias: 'name' });
  readonly $svgIcon = signal<SafeHtml | undefined>(undefined);

  ngOnInit(): void {
    this.iconService.getIcon(this.$name()).subscribe((svg: SafeHtml) => this.$svgIcon.set(svg));
  }
}
