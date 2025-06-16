export enum AlertType {
  Alert = 'alert',
  Info = 'info',
}

export enum MetricType {
  Text = 'text',
  Percent = 'percent',
  Distribution = 'distribution',
}

export enum PolicyType {
  GeneralLiability = 'General Liability',
  WorkersCompensation = 'Workers Compensation',
  CommercialAuto = 'Commercial Auto',
  CommercialProperty = 'Commercial Property',
  CyberLiability = 'Cyber Liability',
  Umbrella = 'Umbrella',
}

import { Winnability } from '@shared/enums/winnability.enum';

export enum StatusStep {
  Submitted = 'Submitted',
  Review = 'Review',
  Quote = 'Quote',
  Bind = 'Bind',
  Issue = 'Issue',
  Renew = 'Renew',
}

export interface AccountDetailsAlert {
  type: AlertType;
  title: string;
  description: string;
  action: string;
}

export interface PerformanceMetric {
  label: string;
  value?: number | string; // number for percentages and winnability, string for text like "YoY increase"
  target?: string;
  description?: string;
  type: MetricType;
  link?: string;
  distribution?: { name: string; value: number }[];
  winnability?: Winnability; // Use numeric winnability
}

export interface Policy {
  type: PolicyType;
  premium: number;
  effDate: string | null;
}

export interface AccountStatusStep {
  step: StatusStep;
  completed: boolean;
}

export interface ComplianceDocumentationItem {
  item: string;
  completed: boolean;
}

export interface WinnabilityOverallScore {
  percentage: number;
  rating: number;
}

export interface WinnabilityHistoricalTrend {
  month: string;
  value: number;
}

export interface WinnabilityPosition {
  yourScore: number;
  marketAverage: number;
  topCompetitor: number;
}

export interface WinnabilityFactor {
  rank: number;
  factor: string;
  percentage: number;
  trend: 'positive' | 'negative';
}

export interface WinnabilityRecommendation {
  title: string;
  description: string;
  action: string;
}

export interface WinnabilityDetails {
  overallScore: WinnabilityOverallScore;
  historicalTrend: WinnabilityHistoricalTrend[];
  position: WinnabilityPosition;
  increasingFactors: WinnabilityFactor[];
  decreasingFactors: WinnabilityFactor[];
  aiRecommendations: WinnabilityRecommendation[];
}

export interface AccountDetails {
  details: AccountDetailsAlert[];
  performanceMetrics: PerformanceMetric[];
  policies: Policy[];
  accountStatus: AccountStatusStep[];
  complianceDocumentation: ComplianceDocumentationItem[];
  winnabilityDetails?: WinnabilityDetails;
}
