export interface EventType {
  event: string;
  start: string;
  end: string;
  id: string;
  color: string;
}

export enum View {
  month = "month",
  list = "list",
}
