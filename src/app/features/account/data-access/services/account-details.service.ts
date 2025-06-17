import { inject, Injectable, signal } from '@angular/core';
import { AccountDetailsClient } from '@core/api/dashboard/account-details.client';
import { AccountDetails } from '@core/models/account/account-details.model';
import { finalize, tap } from 'rxjs';

@Injectable()
export class AccountDetailsService {
  private readonly accountDetailsClient = inject(AccountDetailsClient);

  readonly $isLoading = signal<boolean>(false);
  readonly $accountDetails = signal<AccountDetails | null>(null);

  getAccountDetails() {
    this.$isLoading.set(true);

    return this.accountDetailsClient.getAccountDetails().pipe(
      tap((data) => {
        this.$accountDetails.set(data);
      }),
      finalize(() => {
        this.$isLoading.set(false);
      })
    );
  }
}
