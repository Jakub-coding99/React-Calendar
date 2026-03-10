import type { EventType } from "../types/event";
import { DayEvent } from "./DayEvent";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";

interface Props {
  events?: EventType[];
  nextDay: (type: string) => void;
  prevDay: (type: string) => void;
  addEventCurrentDay?: (info?: string) => void;
  eventDate: string;
  onSelectEvent: (event: EventType) => void;
  deleteEvent?: () => void;
  width: number;
}

export const EventList = ({
  events,
  eventDate,
  nextDay,
  prevDay,
  onSelectEvent,
  addEventCurrentDay,
  deleteEvent,
  width,
}: Props) => {
  return (
    <div className="day-event-list-wrapper">
      <div className="day-event-header">
        <div className="d-flex flex-row align-items-center">
          <h3>{eventDate}</h3>
          {width < 1200 && (
            <button
              className="add-btn-event-list"
              onClick={() => addEventCurrentDay?.("adding-from-event-list")}
              aria-label="Přidat událost"
            >
              <FaPlus />
            </button>
          )}
        </div>
      </div>

      <div className="day-event-nav">
        {width > 1200 && (
          <div className="d-flex flex-row">
            <button className="arrow-prev" onClick={() => prevDay("day-view")}>
              <FaAngleLeft></FaAngleLeft>
            </button>
            <button className="arrow-next" onClick={() => nextDay("day-view")}>
              <FaAngleRight />
            </button>
            <button
              className="add-btn-event-list"
              onClick={() => addEventCurrentDay?.("adding-from-event-list")}
            >
              <FaPlus></FaPlus>
            </button>
          </div>
        )}
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
