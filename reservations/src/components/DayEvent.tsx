import type { EventType } from "../types/event";

interface Props {
  events: EventType;
  totalEvents?: number;
  onSelect?: () => void;
  viewForCalendarList?: boolean;
}

export const DayEvent = ({
  events,
  totalEvents = 1,
  onSelect,
  viewForCalendarList,
}: Props) => {
  const openModal = () => {
    onSelect?.();
  };

  const t = events.start.split("T")[1].split(":");
  const startTime = `${t[0]}:${t[1]}`;
  const startDate = events.start.split("T")[0];

  const isDouble = totalEvents <= 2;

  if (!isDouble) {
    return (
      <div
        onClick={openModal}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: events.color,
          margin: "2px",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      onClick={openModal}
      style={{
        backgroundColor: events.color,
        color: "white",
        borderRadius: "6px",
        padding: "2px 6px",
        margin: "2px 3px",
        fontSize: "16px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {viewForCalendarList
        ? `${events.event} ${startDate} ${startTime}`
        : `${events.event} ${startTime}`}
    </div>
  );
};
