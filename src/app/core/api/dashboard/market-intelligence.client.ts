import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MarketIntelligenceItem } from '@core/models/dashboard/market-intelligence.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketIntelligenceClient {
  private readonly mockUrl = '/mock/market-intelligence.json';
  private readonly http = inject(HttpClient);

  getMarketIntelligence(): Observable<MarketIntelligenceItem[]> {
    return this.http.get<MarketIntelligenceItem[]>(this.mockUrl);
  }
}
