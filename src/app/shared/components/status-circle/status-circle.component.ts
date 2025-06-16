import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-circle',
  standalone: true,
  template: `
    <div class="status-circle" [class.completed]="$completed()" [class.dashed]="$dashed()">
      <span class="checkmark">✓</span>
    </div>
  `,
  styleUrls: ['./status-circle.component.scss'],
})
export class StatusCircleComponent {
  $completed = input<boolean>(false, { alias: 'completed' });
  $dashed = input<boolean>(false, { alias: 'dashed' });
}
