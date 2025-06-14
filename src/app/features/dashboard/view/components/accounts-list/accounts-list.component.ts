import { PercentPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAccountListItem } from '@core/models/dashboard/accounts-list.model';
import { AccountsListService } from '@dashboard/data-access/services/accounts-list.service';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { AccountAppetitePipe } from './pipes/account-appetite.pipe';
import { AccountStatusClassPipe } from './pipes/account-status-class.pipe';
import { AccountStatusPipe } from './pipes/account-status.pipe';
import { AccountWinnabilityClassPipe } from './pipes/account-winnability-class.pipe';
import { AccountWinnabilityPipe } from './pipes/account-winnability.pipe';
import { LossRatioClassPipe } from './pipes/loss-ratio-class.pipe';

@Component({
  selector: 'app-accounts-list',
  imports: [
    PercentPipe,
    CurrencyFormatPipe,
    AccountStatusPipe,
    AccountStatusClassPipe,
    AccountAppetitePipe,
    AccountWinnabilityPipe,
    AccountWinnabilityClassPipe,
    LossRatioClassPipe,
    StatusBadgeComponent,
  ],
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  providers: [AccountsListService],
  standalone: true,
})
export class AccountsListComponent {
  private readonly accountsListService = inject(AccountsListService);

  readonly StatusColors = StatusColors;

  $accountsList = signal<IAccountListItem[]>([]);

  constructor() {
    this.getAccountsList();
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
