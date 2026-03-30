import { Calendar } from "../components/calendar/Calendar";
import type { ClientType, EventType } from "../types/event";

interface Props {
  allClients: ClientType[];
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
