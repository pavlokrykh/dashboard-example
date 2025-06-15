import { DecimalPipe } from '@angular/common';
import { booleanAttribute, Component, computed, input } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Component({
  selector: 'app-progress-bar',
  imports: [DecimalPipe],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  $target = input.required<number>({ alias: 'target' });
  $current = input.required<number>({ alias: 'current' });
  $targetLabel = input.required<string>({ alias: 'targetLabel' });
  $currentLabel = input<string | null>(null, { alias: 'currentLabel' });
  $statusColor = input<StatusColors>(StatusColors.Primary, { alias: 'statusColor' });
  $withPercentage = input(false, { alias: 'withPercentage', transform: booleanAttribute });
  $small = input(false, { alias: 'small', transform: booleanAttribute });

  // Calculate the percentage of current value relative to target
  $percentage = computed(() => {
    const target = this.$target();
    const current = this.$current();
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  });
}
