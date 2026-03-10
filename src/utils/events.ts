import type { EventType, listEventsType } from "../types/event";
import { formatDate, formatDateToDT } from "./date";

export const listViewEvents = (
  events: EventType[],
  month: number,
): listEventsType[] => {
  const filteredEvents: Record<string, EventType[]> = {};
  events
    .filter((ev) => Number(ev.start.split("T")[0].split("-")[1]) == month)
    .forEach((ev) => {
      const date = ev.start.split("T")[0];
      if (!filteredEvents[date]) {
        filteredEvents[date] = [];
      }

      filteredEvents[date].push(ev);

      filteredEvents[date].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });

  const eventsrray = Object.entries(filteredEvents);
  console.log(eventsrray);

  const eventsArray = Object.entries(filteredEvents)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, events]) => ({
      date,
      events: events.sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      ),
    }));

  return eventsArray;
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
