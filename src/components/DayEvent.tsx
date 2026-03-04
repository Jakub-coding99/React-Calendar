import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { EventType } from "../types/event";
import { formatToPrettyDate } from "../utils/date";
import { Alert } from "../components/Alert";
import { useDeleteEvent } from "../utils/eventActions";
import { MdNotes } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbClockHour4 } from "react-icons/tb";

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
          {events.note ? (
            <div className="event-note">
              <div className="note-icon">
                <MdNotes />
              </div>

              <p>
                jhlk jlkjlkkkk llkklklk
                kkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
              </p>
            </div>
          ) : undefined}

          {events.location ? (
            <div className="event-location">
              <div className="location-icon">
                <FaLocationDot />
              </div>
              <p>Ostrava</p>
            </div>
          ) : undefined}
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
          style={{ borderLeft: `${events.color} 5px solid` }}
          onClick={openModal}
          className="month-list-view"
        >
          <div className="month-list-left d-flex  align-items-center justify-content-between gap-2">
            <span className="bigger-span">{events.start.split("T")[1]}</span>
            <span className="smaller-span">1h</span>
          </div>
          <div className="month-list-right d-flex flex-column justify-content-between gap-2">
            <div className="d-flex flex-row justify-content-between">
              <span className="bigger-span">{events.event}</span>
              <span
                style={{
                  background: events.color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ></span>
            </div>
            <span
              style={{
                overflowY: "auto",
                width: "100%",
                whiteSpace: "pre-line",
                maxHeight: "50%",
              }}
            >
              {events.note}
            </span>
            <span>
              <span>
                {" "}
                <TbClockHour4 size={15} />
              </span>
              <span className="smaller-span">
                {" "}
                {events.start.split("T")[1]} - {events.end.split("T")[1]}
              </span>
            </span>
          </div>
        </div>
      ) : undefined}
    </>
  );
};
