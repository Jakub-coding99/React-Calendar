import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "./Button";
import { View } from "../types/event";

interface CalendarHeaderProps {
  month: number;
  year: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  hideInput: () => void;
  showInputDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleTodayClick: () => void;
  setView: (view: View) => void;
  AddEventCurrentDay: () => void;
  months: { [key: number]: string };
}

export const CalendarHeader = ({
  month,
  year,
  inputRef,
  hideInput,
  showInputDate,
  handlePrevClick,
  handleNextClick,
  handleTodayClick,
  AddEventCurrentDay,
  setView,
  months,
}: CalendarHeaderProps) => {
  return (
    <div className="calendar-header d-flex flex-row">
      <Button children="<" onClick={handlePrevClick} />
      <h1>{`${months[month]} ${year}`}</h1>

      <button onClick={hideInput}>
        <FaCalendarAlt size={18} />
      </button>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="month"
        onChange={showInputDate}
      />

      <Button children=">" onClick={handleNextClick} />
      <Button children="today" onClick={handleTodayClick} />
      <Button children="add new" onClick={AddEventCurrentDay} />
      <Button children="list" onClick={() => setView(View.list)} />
      <Button children="month" onClick={() => setView(View.month)} />
    </div>
  );
};
