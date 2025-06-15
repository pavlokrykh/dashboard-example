import { Component, input } from '@angular/core';
import { MetricType, PerformanceMetric } from '@core/models/account/account-details.model';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { WinnabilityLevel } from '@shared/enums/winnability.enum';
import { WinnabilityStatusPipe } from '@shared/pipes/winnability-status.pipe';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [ProgressBarComponent, StatusBadgeComponent, WinnabilityStatusPipe],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
})
export class MetricCardComponent {
  $metric = input.required<PerformanceMetric>({ alias: 'metric' });
  readonly StatusColors = StatusColors;
  readonly MetricType = MetricType;
  readonly WinnabilityLevel = WinnabilityLevel;

  getWinnabilityLevel(): number {
    const winnability = this.$metric().winnability;
    return winnability || 0;
  }
  getWinnabilityStatusClass(): StatusColors {
    const winnability = this.$metric().winnability;
    if (winnability === 4) return StatusColors.Success; // Very Strong
    if (winnability === 3) return StatusColors.Success; // Strong
    if (winnability === 2) return StatusColors.Warning; // Medium
    if (winnability === 1) return StatusColors.Danger; // Not Likely
    return StatusColors.Primary;
  }

  getFormattedValue(): string {
    const metric = this.$metric();

    if (metric.label === 'Winnability') {
      const winnability = metric.winnability;
      if (winnability === 4) return 'Very Strong';
      if (winnability === 3) return 'Strong';
      if (winnability === 2) return 'Medium';
      if (winnability === 1) return 'Not Likely';
      return 'Unknown';
    }

    if (metric.type === MetricType.Percent && typeof metric.value === 'number') {
      return `${metric.value}%`;
    }

    return metric.value?.toString() || '';
  }
}
