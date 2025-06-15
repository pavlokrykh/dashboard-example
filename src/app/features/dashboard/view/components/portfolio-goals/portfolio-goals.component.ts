import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AnnualGwpTarget,
  NewBusinessTarget,
  PortfolioLossRatioTarget,
  RenewalRetention,
} from '@core/models/dashboard/portfolio-goals.model';
import { PortfolioGoalsService } from '@dashboard/data-access/services/portfolio-goals.service';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StatusBarComponent } from '@shared/components/status-bar/status-bar.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { PortfolioLossRatioStatusColorPipe } from './pipes/portfolio-loss-ratio-status-color.pipe';
import { PortfolioLossRatioStatusPipe } from './pipes/portfolio-loss-ratio-status.pipe';

@Component({
  selector: 'app-portfolio-goals',
  imports: [
    StatusBarComponent,
    ProgressBarComponent,
    DecimalPipe,
    CurrencyFormatPipe,
    PortfolioLossRatioStatusPipe,
    PortfolioLossRatioStatusColorPipe,
  ],
  templateUrl: './portfolio-goals.component.html',
  styleUrls: ['./portfolio-goals.component.scss'],
  providers: [PortfolioGoalsService],
})
export class PortfolioGoalsComponent {
  private readonly portfolioGoalsService = inject(PortfolioGoalsService);

  readonly $lossRatioTarget = signal<PortfolioLossRatioTarget | null>(null);
  readonly $renewalRetention = signal<RenewalRetention | null>(null);
  readonly $newBusinessTarget = signal<NewBusinessTarget | null>(null);
  readonly $annualGwpTarget = signal<AnnualGwpTarget | null>(null);

  // Status colors enum for template use
  readonly StatusColors = StatusColors;

  constructor() {
    this.getLossRatio();
    this.getRenewalRetention();
    this.getNewBusinessTarget();
    this.getAnnualGwpTarget();
  }

  private getLossRatio() {
    this.portfolioGoalsService
      .getLossRatio()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.$lossRatioTarget.set(data));
  }

  private getRenewalRetention() {
    this.portfolioGoalsService
      .getRenewalRetention()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.$renewalRetention.set(data));
  }

  private getNewBusinessTarget() {
    this.portfolioGoalsService
      .getNewBusinessTarget()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.$newBusinessTarget.set(data));
  }

  private getAnnualGwpTarget() {
    this.portfolioGoalsService
      .getAnnualTarget()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.$annualGwpTarget.set(data));
  }

  getRenewalRetentionTargetPosition(data: RenewalRetention): number {
    return (data.targetMin + data.targetMax) / 2;
  }
}
