import { AccountDetailsService } from '@account/data-access/services/account-details.service';
import { AlertCardComponent } from '@account/view/components/alert-card/alert-card.component';
import { MetricCardComponent } from '@account/view/components/metric-card/metric-card.component';
import { PolicyCardComponent } from '@account/view/components/policy-card/policy-card.component';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// eslint-disable-next-line max-len
import { AccountStatusProgressComponent } from '@account/view/components/account-status-progress/account-status-progress.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AlertCardComponent, MetricCardComponent, PolicyCardComponent, AccountStatusProgressComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountDetailsService],
})
export class AccountComponent {
  private readonly accountDetailsService = inject(AccountDetailsService);

  readonly $accountDetails = signal(this.accountDetailsService.$accountDetails());

  constructor() {
    this.getAccountDetails();
  }

  private getAccountDetails() {
    this.accountDetailsService
      .getAccountDetails()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        console.log('Account details fetched:', data);

        this.accountDetailsService.$accountDetails.set(data);
        this.$accountDetails.set(data);
      });
  }
}
