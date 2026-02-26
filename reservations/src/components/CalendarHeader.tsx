import {
  FaCalendarAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaPlus,
} from "react-icons/fa";
import { Button } from "./Button";
import { View } from "../types/event";
import { useEffect, useState, useRef } from "react";

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
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown(true);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node))
        return dropdownRef.current;
      setOpenDropdown(false);
    };
    {
      document.addEventListener("mousedown", callback);
    }
  });

  return (
    <div className="calendar-header">
      <div className="header-date-wrapper">
        <h1 id="calendar-date">{`${months[month]} ${year}`}</h1>

        <div className="date-select">
          <div className="date-wrapper">
            <button className="calendar-btn" onClick={hideInput}>
              <FaCalendarAlt size={18} />
            </button>
            <input
              ref={inputRef}
              type="month"
              onChange={showInputDate}
              className="datePicker"
            />
          </div>
        </div>
      </div>

      <div className="direction-btns d-flex flex-row justify-content-center">
        <Button
          children={<FaAngleDoubleLeft />}
          className="arrow-prev"
          onClick={handlePrevClick}
        />

        <Button
          className="today-btn"
          children="Dnes"
          onClick={handleTodayClick}
        />

        <Button
          className="arrow-next"
          onClick={handleNextClick}
          children={<FaAngleDoubleRight />}
        />
      </div>

      <div className="view-btn-wrapper">
        <Button
          className="view-btn"
          children="Zobrazení"
          onClick={handleDropdown}
        />
        {openDropdown && (
          <div ref={dropdownRef} className="dropdown-calendar-header">
            <Button
              className="list-view-btn"
              children="List"
              onClick={() => {
                setView(View.list);
                setOpenDropdown(false);
              }}
            />
            <Button
              className="month-view-btn"
              children="Měsíční"
              onClick={() => {
                setView(View.month);
                setOpenDropdown(false);
              }}
            />
          </div>
        )}
      </div>

      <Button
        className="add-btn"
        onClick={AddEventCurrentDay}
        children={
          <div className="add-btn-content">
            <span>Nová událost</span>
            <FaPlus size={12} />
          </div>
        }
      />
    </div>
  );
};
