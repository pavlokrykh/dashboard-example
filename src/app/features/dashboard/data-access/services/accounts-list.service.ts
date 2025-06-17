import { inject, Injectable, signal } from '@angular/core';
import { AccountsListClient } from '@core/api/dashboard/accounts-list.client';
import { finalize } from 'rxjs';

@Injectable()
export class AccountsListService {
  private readonly accountsListClient = inject(AccountsListClient);

  readonly $isLoading = signal<boolean>(false);

  getAccountsList() {
    this.$isLoading.set(true);
    return this.accountsListClient.getAccountsList().pipe(finalize(() => this.$isLoading.set(false)));
  }
}
