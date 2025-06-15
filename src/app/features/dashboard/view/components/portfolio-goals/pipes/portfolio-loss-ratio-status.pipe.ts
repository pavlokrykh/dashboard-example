import { Pipe, PipeTransform } from '@angular/core';
import {
  PORTFOLIO_GOAL_STATUS_LABELS,
  PortfolioGoalStatus,
  PortfolioLossRatioTarget,
} from '@core/models/dashboard/portfolio-goals.model';

@Pipe({
  name: 'portfolioLossRatioStatus',
})
export class PortfolioLossRatioStatusPipe implements PipeTransform {
  transform(data: PortfolioLossRatioTarget): string {
    const { current, target } = data;
    const difference = ((current - target) * 100).toFixed(1);

    // Find which range the current value falls into
    const currentRange = data.range.find((range) => current >= range.min && current < range.max);

    if (!currentRange) {
      return `${difference}% (UNKNOWN)`;
    }

    const label = PORTFOLIO_GOAL_STATUS_LABELS[currentRange.status];

    switch (currentRange.status) {
      case PortfolioGoalStatus.Good:
        return `${difference}% ${label}`;
      case PortfolioGoalStatus.Acceptable:
        return `${difference}% ${label}`;
      case PortfolioGoalStatus.Bad:
        return `${difference}% (${label})`;
      default:
        return `${difference}% (UNKNOWN)`;
    }
  }
}
