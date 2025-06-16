export enum CommunicationStatus {
  Regular = 0,
  New = 1,
  Responded = 2,
}

export interface Communication {
  status: CommunicationStatus;
  title: string;
  date: string;
  person: string;
  message: string;
  attachments: number;
}
