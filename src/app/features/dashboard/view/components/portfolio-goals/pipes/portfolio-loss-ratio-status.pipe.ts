import { Pipe, PipeTransform } from '@angular/core';
import {
  PORTFOLIO_GOAL_STATUS_LABELS,
  PortfolioGoalStatus,
  PortfolioLossRatioTarget,
} from '@core/models/portfolio-goals.model';

@Pipe({
  name: 'portfolioLossRatioStatus',
})
export class PortfolioLossRatioStatusPipe implements PipeTransform {
  transform(data: PortfolioLossRatioTarget): string {
    const { current, target } = data;
    const difference = (current - target) * 100;

    // Find which range the current value falls into
    const currentRange = data.range.find((range) => current >= range.min && current < range.max);

    if (!currentRange) {
      return `${difference.toFixed(1)}% (UNKNOWN)`;
    }

    const label = PORTFOLIO_GOAL_STATUS_LABELS[currentRange.status];

    switch (currentRange.status) {
      case PortfolioGoalStatus.Good:
        return `${difference.toFixed(1)}% ${label}`;
      case PortfolioGoalStatus.Acceptable:
        return `${Math.abs(difference).toFixed(1)}% ${label}`;
      case PortfolioGoalStatus.Bad:
        return `${Math.abs(difference).toFixed(1)}% (${label})`;
      default:
        return `${difference.toFixed(1)}% (UNKNOWN)`;
    }
  }
}
