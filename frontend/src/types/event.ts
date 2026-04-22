export interface EventType {
  // clientName: string;
  client_id?: number;
  event: string;
  start: string;
  end: string;
  id?: string;
  color?: string;
  note?: string;
  location?: string;
  msg_enabled?: boolean;
  client?: Client;
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
  client?: Client;
  eventBackup?: boolean;
  clientBackup?: Client;
}

export interface listEventsType {
  date: string;
  events: EventType[];
}

export interface Client {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  note?: string;
}

export interface NewClient {
  name: string;
  phone?: string;
  email?: string;
  note?: string;
}

export type ClientAction =
  | { type: "add"; data: NewClient }
  | { type: "edit"; data: Client }
  | { type: "delete"; data: { id: number } };
