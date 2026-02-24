import type { EventType } from "../types/event";

interface Props {
  events: EventType;
  style?: React.CSSProperties;
  classItem?: string;
  open?: boolean;
  onSelect?: () => void;
}

export const DayEvent = ({
  events,
  style,
  classItem,
  open,
  onSelect,
}: Props) => {
  const openModal = () => {
    if (!open) return;
    onSelect?.();
  };

  return (
    <>
      <div onClick={openModal}>
        <div style={style} className={classItem}>
          <p>{events.event}</p>
          <p>{events.start}</p>
          <p>{events.color}</p>
        </div>
      </div>
    </>
  );
};
