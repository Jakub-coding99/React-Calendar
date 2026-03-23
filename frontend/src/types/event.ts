export interface EventType {
  // clientName: string;
  client_id?: number;
  event: string;
  start: string;
  end: string;
  id: string;
  color: string;
  note?: string;
  location?: string;
  msg_enabled?: boolean;
  client?: ClientType;
}

export enum View {
  month = "month",
  list = "list",
  day = "day",
}

export type ModalActions = "add" | "edit" | "show" | "clientEditSwitch";

export interface ModalState {
  event?: EventType;
  action: ModalActions;
  fillData?: string;
  client?: ClientType;
}

export interface listEventsType {
  date: string;
  events: EventType[];
}

export interface ClientType {
  id: number;
  name: string;
  phone?: string;
  email?: string;
}
