import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RenewalRetention } from '@core/models/dashboard/portfolio-goals.model';
import { PortfolioGoalsService } from '@dashboard/data-access/services/portfolio-goals.service';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StatusBarComponent } from '@shared/components/status-bar/status-bar.component';
import { SkeletonDirective } from '@shared/directives/skeleton.directive';
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
    SkeletonDirective,
  ],
  templateUrl: './portfolio-goals.component.html',
  styleUrls: ['./portfolio-goals.component.scss'],
  providers: [PortfolioGoalsService],
})
export class PortfolioGoalsComponent {
  private readonly portfolioGoalsService = inject(PortfolioGoalsService);

  readonly $isLoading = this.portfolioGoalsService.$isLoading;
  readonly $lossRatioTarget = this.portfolioGoalsService.$lossRatioTarget;
  readonly $renewalRetention = this.portfolioGoalsService.$renewalRetention;
  readonly $newBusinessTarget = this.portfolioGoalsService.$newBusinessTarget;
  readonly $annualGwpTarget = this.portfolioGoalsService.$annualGwpTarget;

  readonly StatusColors = StatusColors;
  constructor() {
    this.portfolioGoalsService.getAllPortfolioGoals().pipe(takeUntilDestroyed()).subscribe();
  }

  getRenewalRetentionTargetPosition(data: RenewalRetention): number {
    return (data.targetMin + data.targetMax) / 2;
  }
}
