import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AnnualGwpTarget,
  NewBusinessTarget,
  PortfolioLossRatioTarget,
  RenewalRetention,
} from '@core/models/portfolio-goals.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioGoalsClient {
  private readonly baseUrl = '/mock/portfolio-goals';
  private http = inject(HttpClient);

  getLossRatio(): Observable<PortfolioLossRatioTarget> {
    return this.http.get<PortfolioLossRatioTarget>(`${this.baseUrl}/portfolio-loss-ratio-target.json`);
  }

  getRenewalRetention(): Observable<RenewalRetention> {
    return this.http.get<RenewalRetention>(`${this.baseUrl}/renewal-retention.json`);
  }

  getNewBusinessTarget(): Observable<NewBusinessTarget> {
    return this.http.get<NewBusinessTarget>(`${this.baseUrl}/new-business-target.json`);
  }

  getAnnualTarget(): Observable<AnnualGwpTarget> {
    return this.http.get<AnnualGwpTarget>(`${this.baseUrl}/annual-gwp-target.json`);
  }
}
