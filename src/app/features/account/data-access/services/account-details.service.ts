import { inject, Injectable, signal } from '@angular/core';
import { AccountDetailsClient } from '@core/api/dashboard/account-details.client';
import { AccountDetails } from '@core/models/account/account-details.model';

@Injectable()
export class AccountDetailsService {
  private readonly accountDetailsClient = inject(AccountDetailsClient);

  readonly $accountDetails = signal<AccountDetails | null>(null);

  getAccountDetails() {
    return this.accountDetailsClient.getAccountDetails();
  }
}
