import { NgClass } from '@angular/common';
import { booleanAttribute, Component, computed, input } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    @if ($pill()) {
      <span class="status-badge-pill" [ngClass]="[$statusClass(), $outlined() ? 'outlined' : '']">
        @if ($dots(); as dots) {
          <span class="badge-dots">
            @for (dot of $dotArray(); track $index) {
              <span class="dot"></span>
            }
          </span>
        }
        {{ $text() }}
      </span>
    } @else {
      <span class="status-badge" [ngClass]="[$statusClass(), $large() ? 'large' : '', $dots() ? 'has-dots' : '']">
        @if ($dots(); as dots) {
          <span class="badge-dots">
            @for (dot of $dotArray(); track $index) {
              <span class="dot"></span>
            }
          </span>
        }
        {{ $text() }}
      </span>
    }
  `,
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  $text = input.required<string | number>({ alias: 'text' });
  $statusClass = input.required<StatusColors>({ alias: 'statusClass' });
  $pill = input(false, { alias: 'pill', transform: booleanAttribute });
  $large = input(false, { alias: 'large', transform: booleanAttribute });
  $outlined = input(false, { alias: 'outlined', transform: booleanAttribute });
  $dots = input<number | undefined>(undefined, { alias: 'dots' });

  $dotArray = computed(() => Array(this.$dots() ?? 0).fill(0));
}
