import { AccountDetailsService } from '@account/data-access/services/account-details.service';
import { AlertCardComponent } from '@account/view/components/alert-card/alert-card.component';
import { MetricCardComponent } from '@account/view/components/metric-card/metric-card.component';
import { PoliciesListComponent } from '@account/view/components/policies-list/policies-list.component';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// eslint-disable-next-line max-len
import { AccountStatusProgressComponent } from '@account/view/components/account-status-progress/account-status-progress.component';
import { AccountsDetailsComponent } from '@account/view/components/accounts-details/accounts-details.component';
import { CommunicationComponent } from '@account/view/components/communication/communication.component';
// eslint-disable-next-line max-len
import { ComplianceDocumentationComponent } from '@account/view/components/compliance-documentation/compliance-documentation.component';
// eslint-disable-next-line max-len
import { PoliciesListComponent as DashboardPoliciesListComponent } from '@dashboard/view/components/policies-list/policies-list.component';

@Component({
  selector: 'app-account',
  imports: [
    AlertCardComponent,
    MetricCardComponent,
    PoliciesListComponent,
    AccountStatusProgressComponent,
    ComplianceDocumentationComponent,
    AccountsDetailsComponent,
    CommunicationComponent,
    DashboardPoliciesListComponent,
  ],
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
