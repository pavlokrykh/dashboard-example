import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { PortfolioGoalRange } from '@core/models/portfolio-goals.model';
import { PortfolioGoalStatusClassPipe } from './pipes/portfolio-goal-status-class.pipe';

@Component({
  selector: 'app-status-bar',
  imports: [DecimalPipe, PortfolioGoalStatusClassPipe],
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent {
  $ranges = input.required<PortfolioGoalRange[]>({ alias: 'ranges' });
  $current = input.required<number>({ alias: 'current' });

  $target = input<number | null>(null, { alias: 'target' });
  $displayValue = input<string | null>(null, { alias: 'displayValue' });
  $displaySuffix = input<string>('', { alias: 'displaySuffix' });
  $targetDisplayValue = input<string | null>(null, { alias: 'targetDisplayValue' });
  $statusDisplayValue = input<string | null>(null, { alias: 'statusDisplayValue' });
  $statusColorClass = input<string>('status-success-text', { alias: 'statusColorClass' });

  $arrowColorClass = computed(() => {
    return this.$statusColorClass()?.replace('-text', '-arrow') || 'status-primary-arrow';
  });
}
