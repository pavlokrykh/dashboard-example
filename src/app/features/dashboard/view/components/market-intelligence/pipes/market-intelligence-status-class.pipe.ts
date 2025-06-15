import { Pipe, PipeTransform } from '@angular/core';
import { MarketIntelligenceStatus } from '@core/models/dashboard/market-intelligence.model';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'marketIntelligenceStatusClass',
  standalone: true,
})
export class MarketIntelligenceStatusClassPipe implements PipeTransform {
  transform(status: MarketIntelligenceStatus): StatusColors {
    switch (status) {
      case MarketIntelligenceStatus.Good:
        return StatusColors.Success;
      case MarketIntelligenceStatus.Warning:
        return StatusColors.Warning;
      case MarketIntelligenceStatus.Bad:
        return StatusColors.Danger;
      default:
        return StatusColors.SecondaryDarker;
    }
  }
}
