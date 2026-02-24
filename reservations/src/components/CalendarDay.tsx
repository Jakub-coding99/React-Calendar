import { DayEvent } from "./DayEvent";
import type { EventType } from "../types/event";

interface Props {
  children?: number;
  events?: EventType[];
  classVar?: string;
  onDay?: (day?: number, events?: EventType[]) => void;
}
export const CalendarDay = ({
  children,
  events,
  classVar,

  onDay,
}: Props) => {
  return (
    <>
      <div
        onClick={() => onDay?.(children, events)}
        className={"d-flex flex-column calendarDay " + classVar}
      >
        <div>{children}</div>
        {Array.isArray(events)
          ? events?.map((ev, index) => (
              <DayEvent
                key={index}
                events={ev}
                style={{ background: index === 0 ? "transparent" : ev.color }}
                classItem={index === 0 ? "normal" : "to-circle"}
              />
            ))
          : null}
      </div>
    </>
  );
};
