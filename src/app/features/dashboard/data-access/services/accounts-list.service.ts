import { inject, Injectable } from '@angular/core';
import { AccountsListClient } from '@core/api/dashboard/accounts-list.client';

@Injectable()
export class AccountsListService {
  private readonly accountsListClient = inject(AccountsListClient);

  getAccountsList() {
    return this.accountsListClient.getAccountsList();
  }
}
