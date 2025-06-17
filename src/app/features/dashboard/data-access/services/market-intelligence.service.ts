import { inject, Injectable, signal } from '@angular/core';
import { MarketIntelligenceClient } from '@core/api/dashboard/market-intelligence.client';
import { finalize } from 'rxjs';

@Injectable()
export class MarketIntelligenceService {
  private readonly marketIntelligenceClient = inject(MarketIntelligenceClient);

  readonly $isLoading = signal<boolean>(false);

  getMarketIntelligence() {
    this.$isLoading.set(true);
    return this.marketIntelligenceClient.getMarketIntelligence().pipe(finalize(() => this.$isLoading.set(false)));
  }
}
