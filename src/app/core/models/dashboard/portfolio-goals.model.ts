export enum PortfolioGoalStatus {
  Good = 1,
  Acceptable = 2,
  Bad = 3,
}

export const PORTFOLIO_GOAL_STATUS_LABELS: Record<PortfolioGoalStatus, string> = {
  [PortfolioGoalStatus.Good]: 'GOOD',
  [PortfolioGoalStatus.Acceptable]: 'ACCEPTABLE',
  [PortfolioGoalStatus.Bad]: 'BAD',
};

export interface PortfolioGoalRange {
  status: PortfolioGoalStatus;
  min: number;
  max: number;
}

export interface PortfolioLossRatioTarget {
  target: number;
  current: number;
  range: PortfolioGoalRange[];
}

export interface RenewalRetention {
  targetMin: number;
  targetMax: number;
  current: number;
  range: PortfolioGoalRange[];
}

export interface NewBusinessTarget {
  target: number;
  current: number;
}

export interface AnnualGwpTarget {
  target: number;
  current: number;
}
