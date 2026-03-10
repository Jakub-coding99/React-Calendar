import { DayEvent } from "./DayEvent";
import type { EventType } from "../types/event";

interface Props {
  children?: number;
  events?: EventType[];
  showSelectedEvent?: (e: EventType) => void;
  classVar?: string;
  date: { day: number; month: number; year: number };
  onSelectEvent?: (event: EventType) => void;
  onDay?: (
    date: { day: number; month: number; year: number },
    events?: EventType[],
  ) => void;
  width?: number;
}

export const CalendarDay = ({
  children,
  events,
  classVar,
  onDay,
  date,
  showSelectedEvent,
  width,
}: Props) => {
  const totalEvents = events?.length ?? 0;

  return (
    <div
      onClick={() => onDay?.(date, events)}
      className={"d-flex flex-column calendarDay " + classVar}
    >
      <div className={`day-num ${classVar === "today" ? "today-num" : ""}`}>
        {children}
      </div>
      <div
        className="events-container"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2px",
        }}
      >
        {Array.isArray(events)
          ? events.map((ev, index) => (
              <DayEvent
                key={index}
                events={ev}
                totalEvents={totalEvents}
                className="month-grid-event"
                showSelectedEvent={() => showSelectedEvent?.(ev)}
                width={width}
              />
            ))
          : null}
      </div>
    </div>
  );
};
