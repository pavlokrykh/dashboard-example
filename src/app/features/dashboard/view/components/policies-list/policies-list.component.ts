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
  ],
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss'],
  providers: [PoliciesService],
})
export class PoliciesListComponent {
  private readonly policiesService = inject(PoliciesService);

  readonly StatusColors = StatusColors;

  $policiesList = signal<IPolicy[]>([]);
  $searchValue = signal<string>('');
  $filteredPolicies = computed(() => {
    const searchValue = this.$searchValue().toLowerCase();
    const policies = this.$policiesList();

    if (!searchValue) {
      return policies;
    }

    return policies.filter(
      (policy) => policy.line.toLowerCase().includes(searchValue) || policy.id.toLowerCase().includes(searchValue),
    );
  });

  constructor() {
    this.getPoliciesList();
  }

  onSearchChange(searchValue: string): void {
    this.$searchValue.set(searchValue);
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

  getLossRatioDecimal(lossRatio: number | null): number {
    return lossRatio ? lossRatio / 100 : 0;
  }

  getLossRatioText(lossRatio: number | null): string {
    return lossRatio ? `${lossRatio}%` : 'N/A';
  }
  getTotalExpiringTech(): number {
    return this.$filteredPolicies().reduce((total, policy) => total + policy.expiringTech, 0);
  }

  getTotalExpiringPremium(): number {
    return this.$filteredPolicies().reduce((total, policy) => total + policy.expiringPremium, 0);
  }

  getTotalRenewalToTech(): number {
    return this.$filteredPolicies().reduce((total, policy) => total + policy.renewalToTech, 0);
  }

  getTotalRenewalTech(): number {
    return this.$filteredPolicies().reduce((total, policy) => total + policy.renewalTech, 0);
  }

  getTotalRenewalPremium(): number {
    return this.$filteredPolicies().reduce((total, policy) => total + policy.renewalPremium, 0);
  }

  getAverageRateChange(): string {
    const policies = this.$filteredPolicies().filter((p) => p.rateChange !== null);
    if (policies.length === 0) return 'N/A';
    const average = policies.reduce((sum, policy) => sum + (policy.rateChange || 0), 0) / policies.length;
    return average.toFixed(1);
  }

  getAverageLossRatio(): string {
    const policies = this.$filteredPolicies().filter((p) => p.lossRatio !== null);
    if (policies.length === 0) return 'N/A';
    const average = policies.reduce((sum, policy) => sum + (policy.lossRatio || 0), 0) / policies.length;
    return average.toFixed(1);
  }
}
