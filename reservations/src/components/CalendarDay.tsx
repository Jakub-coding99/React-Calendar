import { DayEvent } from "./DayEvent";
import type { EventType } from "../types/event";

interface Props {
  children?: number;
  events?: EventType[];
  classVar?: string;
  date: { day: number; month: number; year: number };
  onDay?: (
    date: { day: number; month: number; year: number },
    events?: EventType[],
  ) => void;
}

export const CalendarDay = ({
  children,
  events,
  classVar,
  onDay,
  date,
}: Props) => {
  const totalEvents = events?.length ?? 0;

  return (
    <div
      onClick={() => date && onDay?.(date, events)}
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
                onSelect={() => onDay?.(date, events)}
              />
            ))
          : null}
      </div>
    </div>
  );
};
