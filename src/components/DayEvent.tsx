import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { EventType } from "../types/event";
import { formatToPrettyDate } from "../utils/date";
import { Alert } from "../components/Alert";
import { useDeleteEvent } from "../utils/eventActions";
import { MdNotes } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  events: EventType;
  totalEvents?: number;
  onSelect?: () => void;
  className?: string;
  showSelectedEvent?: (e: EventType) => void;
  deleteEvent?: (data: Object) => void;
}

export const DayEvent = ({
  events,
  totalEvents = 1,
  onSelect,
  className,
  showSelectedEvent,
  deleteEvent,
}: Props) => {
  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.();
  };

  const startT = events.start.split("T")[1].split(":");
  const startTime = `${startT[0]}:${startT[1]}`;
  const endT = events.end.split("T")[1].split(":");
  const endTime = `${endT[0]}:${endT[1]}`;

  const startDate = events.start.split("T")[0];
  const endDate = events.end.split("T")[0];

  const { showAlert, handleDelete, triggerDelete, setShowAlert } =
    useDeleteEvent({
      e: events,
      onChange: deleteEvent!,
    });

  const isDouble = totalEvents <= 3;

  if (!isDouble && className == "month-grid-event") {
    return (
      <div
        className="month-grid-event-dotted"
        onClick={(e) => {
          e.stopPropagation();
          {
            showSelectedEvent?.(events);
          }
        }}
        style={{
          backgroundColor: events.color,
        }}
      />
    );
  }

  return (
    <>
      {showAlert && (
        <Alert
          confirm={handleDelete}
          close={() => setShowAlert(false)}
          children="Opravdu chcete událost smazat?"
        />
      )}
      {className == "event-list-view" ? (
        <div
          className="event-list-view"
          style={{
            borderLeft: `5px solid ${events.color}`,
          }}
        >
          <div className="d-flex flex-row justify-content-between align-items-start mb-4 border-bottom border-secondary-subtle">
            <p className="event-title-event-list flex-grow-1 me-3 text-truncate">
              {events.event}
            </p>
            <div className="d-flex align-items-center gap-2">
              <button className="icon-btn" onClick={openModal}>
                <FaEdit />
              </button>
              <button className="icon-btn delete" onClick={triggerDelete}>
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>

          {startDate == endDate ? (
            <div>
              <p>{`${startTime} - ${endTime}`}</p>
            </div>
          ) : (
            <div>
              <p>{`${formatToPrettyDate(startDate)} ${startTime} - ${formatToPrettyDate(endDate)} ${endTime}`}</p>
            </div>
          )}

          <div className="event-note">
            <div className="note-icon">
              <MdNotes />
            </div>

            <p>
              jhlk jlkjlkkkk llkklklk
              kkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            </p>
          </div>
          <div className="event-location">
            <div className="location-icon">
              <FaLocationDot />
            </div>
            <p>Ostrava</p>
          </div>
        </div>
      ) : undefined}

      {className == "month-grid-event" ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            {
              showSelectedEvent?.(events);
            }
          }}
          className="month-grid-event"
          style={{
            backgroundColor: events.color,
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <p
              className="mr-1"
              style={{
                width: "80px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {events.event}
            </p>
            <p className="ml-1 justify-content-end ">{startTime}</p>
          </div>
        </div>
      ) : undefined}

      {className == "calendar-list-view" ? (
        <div
          className="event-list-view"
          style={{
            backgroundColor: "beige",
            color: "blue",
          }}
        >
          {" "}
          {events.event}
          <button onClick={openModal}>edit</button>
        </div>
      ) : undefined}
    </>
  );
};
