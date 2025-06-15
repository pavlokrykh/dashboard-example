import { Pipe, PipeTransform } from '@angular/core';
import { PortfolioGoalStatus } from '@core/models/dashboard/portfolio-goals.model';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'portfolioGoalStatusClass',
  standalone: true,
})
export class PortfolioGoalStatusClassPipe implements PipeTransform {
  transform(status: PortfolioGoalStatus): StatusColors {
    switch (status) {
      case PortfolioGoalStatus.Good:
        return StatusColors.Success;
      case PortfolioGoalStatus.Acceptable:
        return StatusColors.Warning;
      case PortfolioGoalStatus.Bad:
        return StatusColors.Danger;
      default:
        return StatusColors.Primary;
    }
  }
}
