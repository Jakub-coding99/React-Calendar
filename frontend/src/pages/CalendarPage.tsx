import { Calendar } from "../components/calendar/Calendar";
import type { Client, EventType } from "../types/event";

interface Props {
  allClients: Client[];
  allEvents: EventType[];
}

export const CalendarPage = ({ allClients, allEvents }: Props) => {
  return (
    <>
      <div className="calendar-page">
        <Calendar allClients={allClients} allEvents={allEvents} />
      </div>
    </>
  );
};
