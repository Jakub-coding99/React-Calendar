import {
  FaCalendarAlt,
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
} from "react-icons/fa";
import { Button } from "./Button";
import { View } from "../types/event";
import { useEffect, useState, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface CalendarHeaderProps {
  month: number;
  year: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  hideInput: () => void;
  showInputDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleTodayClick: () => void;
  AddEventCurrentDay: () => void;
  months: { [key: number]: string };
  setView: React.Dispatch<React.SetStateAction<View>>;
  view: string;
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
  view,
}: CalendarHeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const openDatePicker = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };

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

  const viewInfo = () => {
    switch (view) {
      case (view = View.day):
        return "Den";
      case (view = View.month):
        return "Měsíc";
      case (view = View.list):
        return "Agenda";
    }
  };

  return (
    <>
      <div className="calendar-header">
        <div className="header-date-wrapper">
          <h1
            onClick={() => setView(View.month)}
            id="calendar-date"
          >{`${months[month]} ${year}`}</h1>

          <div className="date-select">
            <div className="date-wrapper">
              <button
                type="button"
                className="calendar-btn"
                onClick={openDatePicker}
              >
                <FaCalendarAlt size={18} />
              </button>

              <input
                ref={inputRef}
                type="month"
                className="datePicker"
                onChange={showInputDate}
                onBlur={hideInput}
              />
            </div>
          </div>
        </div>

        <div className="direction-btns d-flex flex-row ">
          <Button
            children={<FaAngleLeft />}
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
            children={<FaAngleRight />}
          />
        </div>

        <div className="view-btn-wrapper">
          <Button className="view-btn" onClick={handleDropdown}>
            {viewInfo()}
            <span>
              <MdOutlineKeyboardArrowDown size={20} />
            </span>
          </Button>

          {openDropdown && (
            <div ref={dropdownRef} className="dropdown-calendar-header">
              {view !== "day" && (
                <Button
                  onClick={() => {
                    setView(View.day);
                    setOpenDropdown(false);
                  }}
                  className="day-view-btn"
                  children="Den"
                />
              )}

              {view != "list" && (
                <Button
                  className="list-view-btn"
                  children="Agenda"
                  onClick={() => {
                    setView(View.list);
                    setOpenDropdown(false);
                  }}
                />
              )}

              {view != "month" && (
                <Button
                  className="month-view-btn"
                  children="Měsíc"
                  onClick={() => {
                    setView(View.month);
                    setOpenDropdown(false);
                  }}
                />
              )}
            </div>
          )}
        </div>

        <Button
          className="add-btn"
          onClick={AddEventCurrentDay}
          children={
            <div className="add-btn-content">
              <FaPlus size={12} />
              <span>Vytvořit</span>
            </div>
          }
        />
      </div>

      <Button
        className="mobile-add-btn"
        onClick={AddEventCurrentDay}
        children={
          <div className="add-btn-content-mobile">
            <FaPlus className="plus-icon" />
          </div>
        }
      />
    </>
  );
};
