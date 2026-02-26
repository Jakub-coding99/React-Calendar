import type { EventType } from "../types/event";
import { formatDate, formatDateToDT } from "./date";

export const listViewEvents = (event: EventType[], month: number) => {
  const filteredMonth = event.filter(
    (ev) => Number(ev.start.split("T")[0].split("-")[1]) == month,
  );
  return filteredMonth;
};

export const updateClickedDay = (event: EventType[], month: number) => {
  const filteredMonth = event.filter(
    (ev) => Number(ev.start.split("T")[0].split("-")) == month,
  );

  return filteredMonth;
};

export const defaultToday = (
  initialsEvents: EventType[],
  currentDate: Date,
) => {
  const events = initialsEvents.filter(
    (ev) => ev.start.split("T")[0] === formatDate(currentDate),
  );
  return events;
};

export const filterEV = (
  year: number,
  month: number,
  day: number,
  events: EventType[],
) => {
  const date = formatDateToDT(year, month, day);

  return events.filter((ev) => ev.start.split("T")[0] === date);
};
