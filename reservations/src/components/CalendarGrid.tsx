import "../style/styles.css";

interface Props {
  arr?: React.ReactNode[];
}

export const CalendarGrid = ({ arr }: Props) => {
  const days = [
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
    "Sobota",
    "Neděle",
  ];

  return (
    <>
      <div className="calendarDaysLayout">
        {days.map((day, index) => (
          <div key={index} className="weekDays">
            {day}
          </div>
        ))}
        {arr?.map((dayItem, index) => (
          <div key={index} className="calendarDays">
            {dayItem}
          </div>
        ))}
      </div>
    </>
  );
};
