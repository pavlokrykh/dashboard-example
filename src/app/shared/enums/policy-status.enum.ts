export enum PolicyStatus {
  Active = 1,
  Pending = 2,
}

export const POLICY_STATUS_TRANSLATIONS = {
  [PolicyStatus.Active]: 'Active',
  [PolicyStatus.Pending]: 'Pending',
};
