import { DayEvent } from "./DayEvent";
import type { EventType, listEventsType } from "../types/event";
import { months } from "../utils/date";

interface Props {
  events?: listEventsType[];

  onSelectEvent: (event: EventType) => void;
}

export const CalendarList = ({ events, onSelectEvent }: Props) => {
  return (
    <>
      <div className="list-content">
        {events?.map((day, index) => (
          <div key={index} className="new-event-list-day">
            <div className="d-flex flex-row marker-list-border ">
              <div className="d-flex flex-column m-0  g-0 justify-content-center align-items-center day-marker-list">
                <span className="fw-bold" style={{ fontSize: 20 }}>
                  {Number(day.date.split("-")[2])}{" "}
                </span>
                <span style={{ textTransform: "uppercase" }}>
                  {months[Number(day.date.split("-")[1])].slice(0, 3)}
                </span>
              </div>
              <div className="d-flex align-items-center mx-2">
                <span>
                  {day.events.length}{" "}
                  {day.events.length == 1 ? "událost" : "události"}{" "}
                </span>
              </div>
            </div>
            <div>
              {day.events.map((ev, index) => (
                <DayEvent
                  key={index}
                  events={ev}
                  onSelect={() => onSelectEvent(ev)}
                  className="calendar-list-view"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {events?.length == 0 ? "neni udalost" : undefined}
    </>
  );
};
