import { PercentPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPolicy } from '@core/models/dashboard/policy.model';
import { PoliciesService } from '@dashboard/data-access/services/policies.service';
import { SearchComponent } from '@shared/components/search/search.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { LossRatioClassPipe } from '@shared/pipes/loss-ratio-class.pipe';
import { ValuePlaceholderPipe } from '@shared/pipes/value-placeholder.pipe';
import { PolicyStatusClassPipe } from './pipes/policy-status-class.pipe';
import { PolicyStatusPipe } from './pipes/policy-status.pipe';

@Component({
  selector: 'app-dashboard-policies-list',
  imports: [
    PercentPipe,
    CurrencyFormatPipe,
    PolicyStatusPipe,
    PolicyStatusClassPipe,
    LossRatioClassPipe,
    StatusBadgeComponent,
    SearchComponent,
    ValuePlaceholderPipe,
  ],
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss'],
  providers: [PoliciesService],
})
export class PoliciesListComponent {
  private readonly policiesService = inject(PoliciesService);

  readonly $policiesList = signal<IPolicy[]>([]);
  readonly $searchValue = signal<string>('');

  readonly $filteredPolicies = computed(() => {
    const searchValue = this.$searchValue().toLowerCase();
    const policies = this.$policiesList();

    if (!searchValue) {
      return policies;
    }

    return policies.filter(
      (policy) => policy.line.toLowerCase().includes(searchValue) || policy.id.toLowerCase().includes(searchValue),
    );
  });

  readonly $totals = computed(() => {
    const policies = this.$filteredPolicies();

    const totals = policies.reduce(
      (acc, policy) => {
        acc.expiringTech += policy.expiringTech;
        acc.expiringPremium += policy.expiringPremium;
        acc.renewalToTech += policy.renewalToTech;
        acc.renewalTech += policy.renewalTech;
        acc.renewalPremium += policy.renewalPremium;

        if (policy.rateChange !== null) {
          acc.rateChangeSum += policy.rateChange;
          acc.rateChangeCount += 1;
        }

        if (policy.lossRatio !== null) {
          acc.lossRatioSum += policy.lossRatio;
          acc.lossRatioCount += 1;
        }

        return acc;
      },
      {
        expiringTech: 0,
        expiringPremium: 0,
        renewalToTech: 0,
        renewalTech: 0,
        renewalPremium: 0,
        rateChangeSum: 0,
        rateChangeCount: 0,
        lossRatioSum: 0,
        lossRatioCount: 0,
      },
    );

    return {
      count: policies.length,
      expiringTech: totals.expiringTech,
      expiringPremium: totals.expiringPremium,
      renewalToTech: totals.renewalToTech,
      renewalTech: totals.renewalTech,
      renewalPremium: totals.renewalPremium,
      averageRateChange: totals.rateChangeCount > 0 ? (totals.rateChangeSum / totals.rateChangeCount).toFixed(1) : null,
      averageLossRatio: totals.lossRatioCount > 0 ? (totals.lossRatioSum / totals.lossRatioCount).toFixed(1) : null,
    };
  });

  readonly StatusColors = StatusColors;

  constructor() {
    this.getPoliciesList();
  }

  onSearchChange(searchValue: string): void {
    this.$searchValue.set(searchValue);
  }

  getLossRatioDecimal(lossRatio: number | null): number {
    return lossRatio ? lossRatio / 100 : 0;
  }

  formatPercentage(value: string | null): string {
    return value ? `${value}%` : 'N/A';
  }

  private getPoliciesList() {
    this.policiesService
      .getPolicies()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (policies) => {
          this.$policiesList.set(policies);
        },
      });
  }
}
