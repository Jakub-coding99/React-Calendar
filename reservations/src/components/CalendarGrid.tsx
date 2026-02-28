import "../style/styles.css";

interface Props {
  arr?: React.ReactNode[];
}

export const CalendarGrid = ({ arr }: Props) => {
  return (
    <>
      <div className="calendarDaysLayout">
        {arr?.map((dayItem, index) => (
          <div key={index} className="calendarDays">
            {dayItem}
          </div>
        ))}
      </div>
    </>
  );
};
