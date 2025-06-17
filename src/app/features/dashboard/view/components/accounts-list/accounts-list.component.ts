import { PercentPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAccountListItem } from '@core/models/dashboard/accounts-list.model';
import { AccountsListService } from '@dashboard/data-access/services/accounts-list.service';
import { SearchComponent } from '@shared/components/search/search.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { SkeletonDirective } from '@shared/directives/skeleton.directive';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { LossRatioClassPipe } from '@shared/pipes/loss-ratio-class.pipe';
import { WinnabilityClassPipe } from '@shared/pipes/winnability-class.pipe';
import { WinnabilityStatusPipe } from '@shared/pipes/winnability-status.pipe';
import { AccountAppetitePipe } from './pipes/account-appetite.pipe';
import { AccountStatusClassPipe } from './pipes/account-status-class.pipe';
import { AccountStatusPipe } from './pipes/account-status.pipe';

@Component({
  selector: 'app-accounts-list',
  imports: [
    PercentPipe,
    CurrencyFormatPipe,
    AccountStatusPipe,
    AccountStatusClassPipe,
    AccountAppetitePipe,
    WinnabilityStatusPipe,
    WinnabilityClassPipe,
    LossRatioClassPipe,
    StatusBadgeComponent,
    SearchComponent,
    SkeletonDirective,
  ],
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  providers: [AccountsListService],
})
export class AccountsListComponent {
  private readonly accountsListService = inject(AccountsListService);

  readonly $isLoading = this.accountsListService.$isLoading;

  readonly $accountsList = signal<IAccountListItem[]>([]);
  readonly $searchValue = signal<string>('');

  readonly $filteredAccounts = computed(() => {
    const searchValue = this.$searchValue().toLowerCase();
    const accounts = this.$accountsList();

    if (!searchValue) {
      return accounts;
    }

    return accounts.filter(
      (account) => 
        account.accountName.toLowerCase().includes(searchValue) || 
        account.accountType.toLowerCase().includes(searchValue) ||
        account.line.toLowerCase().includes(searchValue) ||
        account.broker.toLowerCase().includes(searchValue)
    );
  });

  readonly StatusColors = StatusColors;

  constructor() {
    this.getAccountsList();
  }

  onSearchChange(searchValue: string): void {
    this.$searchValue.set(searchValue);
  }

  private getAccountsList() {
    this.accountsListService
      .getAccountsList()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (accounts) => {
          this.$accountsList.set(accounts);
        },
      });
  }
}
