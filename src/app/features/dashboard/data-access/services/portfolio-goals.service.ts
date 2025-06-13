import { inject, Injectable } from '@angular/core';
import { PortfolioGoalsClient } from '@core/api/dashboard/portfolio-goals.client';

@Injectable()
export class PortfolioGoalsService {
  private readonly portfolioGoalsClient = inject(PortfolioGoalsClient);

  getLossRatio() {
    return this.portfolioGoalsClient.getLossRatio();
  }

  getRenewalRetention() {
    return this.portfolioGoalsClient.getRenewalRetention();
  }

  getNewBusinessTarget() {
    return this.portfolioGoalsClient.getNewBusinessTarget();
  }

  getAnnualTarget() {
    return this.portfolioGoalsClient.getAnnualTarget();
  }
}
