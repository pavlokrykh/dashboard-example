export enum WorkQueueStatus {
  New = 1,
  Pending = 2,
  Completed = 3,
}

export const WORK_QUEUE_STATUS_TRANSLATIONS = {
  [WorkQueueStatus.New]: 'New',
  [WorkQueueStatus.Pending]: 'Pending Review',
  [WorkQueueStatus.Completed]: 'Completed',
};

export interface IWorkQueueItem {
  originator: string;
  client: string;
  line: string;
  type: string;
  status: WorkQueueStatus;
  created: string;
}
