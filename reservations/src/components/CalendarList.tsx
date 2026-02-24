import { DayEvent } from "./DayEvent";
import type { EventType } from "../types/event";

interface Props {
  events?: EventType[];

  onSelectEvent: (event: EventType) => void; // nově
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
              open={true} // jen pro modal trigger
              onSelect={() => onSelectEvent(ev)} // tady pošli event parentu
            />
          ))}
        </div>
      </div>
    </>
  );
};
