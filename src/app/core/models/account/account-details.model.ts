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
  RenewalMeeting = 'Renewal meeting',
  RenewalTerms = 'Renewal terms',
  ProposalReview = 'Proposal review',
  FinalNegotiation = 'Final negotiation',
  Closing = 'Closing',
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

export interface AccountDetails {
  details: AccountDetailsAlert[];
  performanceMetrics: PerformanceMetric[];
  policies: Policy[];
  accountStatus: AccountStatusStep[];
}
