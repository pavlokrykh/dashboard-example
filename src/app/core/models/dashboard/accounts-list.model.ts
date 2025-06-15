export enum Appetite {
  High = 1,
  Medium = 2,
  Cautious = 3,
}

export enum Status {
  Active = 1,
  Review = 2,
}

export enum Winnability {
  NotLikely = 1,
  Medium = 2,
  Strong = 3,
  VeryStrong = 4,
}

export interface IAccountListItem {
  id: number;
  accountName: string;
  accountType: string;
  line: string;
  broker: string;
  renewalDate: string;
  premium: number;
  ratedPremium: number;
  lossRatio: number;
  appetite: Appetite;
  status: Status;
  triage: number;
  winnability: Winnability;
}
