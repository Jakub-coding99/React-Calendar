import type { EventType } from "../types/event";
import { DayEvent } from "./DayEvent";

interface Props {
  events?: EventType[];
  nextDay?: () => void;
  prevDay?: () => void;
  addEventCurrentDay?: (info?: string) => void;
  eventDate: string;
  onSelectEvent: (event: EventType) => void;
  deleteEvent?: () => void;
}

export const EventList = ({
  events,
  eventDate,
  nextDay,
  prevDay,
  onSelectEvent,
  addEventCurrentDay,
  deleteEvent,
}: Props) => {
  return (
    <div className="day-event-list-wrapper">
      <div className="day-event-header">
        <h3>Denní Události</h3>
        <h5>{eventDate}</h5>
      </div>

      <div className="day-event-nav">
        <button onClick={prevDay}>Předchozí</button>
        <button onClick={nextDay}>Další</button>
        <button onClick={() => addEventCurrentDay?.("adding-from-event-list")}>
          Přidat
        </button>
      </div>

      <div className="day-event-list">
        {events?.map((event, index) => (
          <DayEvent
            events={event}
            key={index}
            onSelect={() => onSelectEvent(event)}
            className="event-list-view"
            deleteEvent={deleteEvent}
          />
        ))}
        {events?.length === 0 && (
          <p className="no-events-text">Žádné události</p>
        )}
      </div>
    </div>
  );
};
