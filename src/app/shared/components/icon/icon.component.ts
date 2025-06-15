import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { IconService } from '@shared/services/icon.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: '<span [innerHTML]="$svgIcon()"></span>',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input({ required: true }) name!: string;

  private readonly iconService = inject(IconService);

  readonly $svgIcon = signal<SafeHtml | undefined>(undefined);

  ngOnInit(): void {
    this.iconService.getIcon(this.name).subscribe((svg: SafeHtml) => this.$svgIcon.set(svg));
  }
}
