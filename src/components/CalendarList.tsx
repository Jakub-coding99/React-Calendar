import { DayEvent } from "./DayEvent";
import type { EventType } from "../types/event";

interface Props {
  events?: EventType[];

  onSelectEvent: (event: EventType) => void;
}

export const CalendarList = ({ events, onSelectEvent }: Props) => {
  return (
    <>
      <div id="calendar-list">
        <div className="calendar-list-wrapper">
          {events?.map((ev) => (
            <DayEvent
              key={ev.id}
              events={ev}
              onSelect={() => onSelectEvent(ev)}
              className="calendar-list-view"
            />
          ))}
        </div>
      </div>
    </>
  );
};
