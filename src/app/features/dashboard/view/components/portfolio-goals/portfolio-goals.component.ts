import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PortfolioLossRatioTarget, RenewalRetention } from '@core/models/portfolio-goals.model';
import { PortfolioGoalsService } from '@dashboard/data-access/services/portfolio-goals.service';
import { StatusBarComponent } from '@shared/components/status-bar/status-bar.component';
import { PortfolioLossRatioStatusColorPipe } from './pipes/portfolio-loss-ratio-status-color.pipe';
import { PortfolioLossRatioStatusPipe } from './pipes/portfolio-loss-ratio-status.pipe';

@Component({
  selector: 'app-portfolio-goals',
  imports: [StatusBarComponent, DecimalPipe, PortfolioLossRatioStatusPipe, PortfolioLossRatioStatusColorPipe],
  templateUrl: './portfolio-goals.component.html',
  styleUrls: ['./portfolio-goals.component.scss'],
  providers: [PortfolioGoalsService],
})
export class PortfolioGoalsComponent {
  private readonly portfolioGoalsService = inject(PortfolioGoalsService);

  readonly $lossRatioTarget = signal<PortfolioLossRatioTarget | null>(null);
  readonly $renewalRetention = signal<RenewalRetention | null>(null);

  constructor() {
    this.getLossRatio();
    this.getRenewalRetention();
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

  getRenewalRetentionTargetPosition(data: RenewalRetention): number {
    return (data.targetMin + data.targetMax) / 2;
  }
}
