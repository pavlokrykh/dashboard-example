import { booleanAttribute, Component, input } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    @if ($pill()) {
      <span class="status-badge-pill" [class]="$statusClass()">
        {{ $text() }}
      </span>
    } @else {
      <span class="status-badge" [class]="$statusClass()" [class.large]="$large()">
        {{ $text() }}
      </span>
    }
  `,
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  $text = input.required<string>({ alias: 'text' });
  $statusClass = input.required<StatusColors>({ alias: 'statusClass' });
  $pill = input(false, { alias: 'pill', transform: booleanAttribute });
  $large = input(false, { alias: 'large', transform: booleanAttribute });
}
