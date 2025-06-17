import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarketIntelligenceItem } from '@core/models/dashboard/market-intelligence.model';
import { MarketIntelligenceService } from '@dashboard/data-access/services/market-intelligence.service';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { SkeletonDirective } from '@shared/directives/skeleton.directive';
import { MarketIntelligenceStatusClassPipe } from './pipes/market-intelligence-status-class.pipe';

@Component({
  selector: 'app-market-intelligence',
  imports: [StatusBadgeComponent, MarketIntelligenceStatusClassPipe, SkeletonDirective],
  templateUrl: './market-intelligence.component.html',
  styleUrls: ['./market-intelligence.component.scss'],
  providers: [MarketIntelligenceService],
})
export class MarketIntelligenceComponent {
  private readonly marketIntelligenceService = inject(MarketIntelligenceService);

  readonly $isLoading = this.marketIntelligenceService.$isLoading;

  readonly $marketIntelligenceItems = signal<MarketIntelligenceItem[]>([]);

  constructor() {
    this.getMarketIntelligence();
  }

  private getMarketIntelligence() {
    this.marketIntelligenceService
      .getMarketIntelligence()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => {
        this.$marketIntelligenceItems.set(items);
      });
  }
}
