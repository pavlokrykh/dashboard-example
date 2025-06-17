import { inject, Injectable, signal } from '@angular/core';
import { PortfolioGoalsClient } from '@core/api/dashboard/portfolio-goals.client';
import {
  AnnualGwpTarget,
  NewBusinessTarget,
  PortfolioLossRatioTarget,
  RenewalRetention,
} from '@core/models/dashboard/portfolio-goals.model';
import { forkJoin, tap } from 'rxjs';

@Injectable()
export class PortfolioGoalsService {
  private readonly portfolioGoalsClient = inject(PortfolioGoalsClient);

  readonly $isLoading = signal<boolean>(false);
  readonly $lossRatioTarget = signal<PortfolioLossRatioTarget | null>(null);
  readonly $renewalRetention = signal<RenewalRetention | null>(null);
  readonly $newBusinessTarget = signal<NewBusinessTarget | null>(null);
  readonly $annualGwpTarget = signal<AnnualGwpTarget | null>(null);

  getAllPortfolioGoals() {
    this.$isLoading.set(true);

    return forkJoin({
      lossRatio: this.portfolioGoalsClient.getLossRatio(),
      renewalRetention: this.portfolioGoalsClient.getRenewalRetention(),
      newBusinessTarget: this.portfolioGoalsClient.getNewBusinessTarget(),
      annualTarget: this.portfolioGoalsClient.getAnnualTarget(),
    }).pipe(
      tap((data) => {
        this.$lossRatioTarget.set(data.lossRatio);
        this.$renewalRetention.set(data.renewalRetention);
        this.$newBusinessTarget.set(data.newBusinessTarget);
        this.$annualGwpTarget.set(data.annualTarget);
        this.$isLoading.set(false);
      }),
    );
  }
}
