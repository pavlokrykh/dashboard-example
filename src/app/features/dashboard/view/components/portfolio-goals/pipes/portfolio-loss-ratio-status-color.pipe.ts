import { Pipe, PipeTransform } from '@angular/core';
import { PortfolioGoalStatus, PortfolioLossRatioTarget } from '@core/models/portfolio-goals.model';

@Pipe({
  name: 'portfolioLossRatioStatusColor',
})
export class PortfolioLossRatioStatusColorPipe implements PipeTransform {
  transform(data: PortfolioLossRatioTarget): string {
    const current = data.current;

    // Find which range the current value falls into
    const currentRange = data.range.find((range) => current >= range.min && current < range.max);

    if (!currentRange) {
      return 'status-warning-text';
    }

    switch (currentRange.status) {
      case PortfolioGoalStatus.Good:
        return 'status-success-text';
      case PortfolioGoalStatus.Acceptable:
        return 'status-warning-text';
      case PortfolioGoalStatus.Bad:
        return 'status-danger-text';
      default:
        return 'status-warning-text';
    }
  }
}
