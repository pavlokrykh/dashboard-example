import { PercentPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAccountListItem } from '@core/models/dashboard/accounts-list.model';
import { AccountsListService } from '@dashboard/data-access/services/accounts-list.service';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { WinnabilityClassPipe } from '@shared/pipes/winnability-class.pipe';
import { WinnabilityStatusPipe } from '@shared/pipes/winnability-status.pipe';
import { AccountAppetitePipe } from './pipes/account-appetite.pipe';
import { AccountStatusClassPipe } from './pipes/account-status-class.pipe';
import { AccountStatusPipe } from './pipes/account-status.pipe';
import { LossRatioClassPipe } from './pipes/loss-ratio-class.pipe';

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
  ],
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  providers: [AccountsListService],
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
