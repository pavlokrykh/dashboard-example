export enum MarketIntelligenceStatus {
  Good = 1,
  Warning = 2,
  Bad = 3,
}

export interface MarketIntelligenceItem {
  status: MarketIntelligenceStatus;
  value: string;
}
