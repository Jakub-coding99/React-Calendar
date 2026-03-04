export interface EventType {
  event: string;
  start: string;
  end: string;
  id: string;
  color: string;
  note?: string;
  location?: string;
}

export enum View {
  month = "month",
  list = "list",
  day = "day",
}

export interface ModalState {
  event?: EventType;
  action: "add" | "edit" | "show";
  fillData?: string;
}

export interface listEventsType {
  date: string;
  events: EventType[];
}
