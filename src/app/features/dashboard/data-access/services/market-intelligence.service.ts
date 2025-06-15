import { inject, Injectable } from '@angular/core';
import { MarketIntelligenceClient } from '@core/api/dashboard/market-intelligence.client';

@Injectable()
export class MarketIntelligenceService {
  private readonly marketIntelligenceClient = inject(MarketIntelligenceClient);

  getMarketIntelligence() {
    return this.marketIntelligenceClient.getMarketIntelligence();
  }
}
