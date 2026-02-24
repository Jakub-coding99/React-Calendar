import type { EventType } from "../types/event";
import { DayEvent } from "./DayEvent";

interface Props {
  events?: EventType[];
  nextDay?: () => void;
  prevDay?: () => void;
  addEventCurrentDay?: (info?: string) => void;
  eventDate: string;
  onSelectEvent: (event: EventType) => void;
}

export const EventList = ({
  events,
  eventDate,
  nextDay,
  prevDay,
  onSelectEvent,
  addEventCurrentDay,
}: Props) => {
  return (
    <>
      <h3>Denní Události</h3>
      <h5>{eventDate}</h5>
      <button onClick={prevDay}>pre</button>
      <button onClick={nextDay}>dal</button>
      <button onClick={() => addEventCurrentDay?.("adding-from-event-list")}>
        add
      </button>

      <div className="day-event-list">
        {events?.map((event, index) => (
          <DayEvent
            events={event}
            key={index}
            onSelect={() => onSelectEvent(event)}
            open={true}
          />
        ))}
      </div>
    </>
  );
};
