import { PolicyStatus } from '@shared/enums/policy-status.enum';

export interface IPolicy {
  id: string;
  line: string;
  effDate: string;
  expDate: string;
  status: PolicyStatus;
  expiringTech: number;
  expiringPremium: number;
  renewalToTech: number;
  renewalTech: number;
  renewalPremium: number;
  rateChange: number | null;
  lossRatio: number | null;
}
