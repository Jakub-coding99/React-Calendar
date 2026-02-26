import { useState, useRef } from "react";
import type { EventType } from "../types/event";
import { View } from "../types/event";
import { updateClickedDay } from "../utils/events";
import { filterEV, defaultToday } from "../utils/events";

// EDIT EVENT FUNCTIONS
export const useCalendar = (initialsEvents: EventType[]) => {
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [event, setEvent] = useState(initialsEvents);
  const [view, setView] = useState<View>(View.month);
  const [eventList, setEventList] = useState<EventType[]>(
    defaultToday(initialsEvents, currentDate),
  );
  const [day, setDay] = useState(currentDate.getDate());
  const [addEvent, setAddEvent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const d = (y: number, m: number) => new Date(y, m, 0).getDate();
  const daysInMonth = d(year, month);
  const [dateInAdd, setDateinAdd] = useState(false);

  const addEventCurrentDay = (info?: string) => {
    setDateinAdd(false);
    if (info == "adding-from-event-list") {
      setDateinAdd(true);
    }

    setAddEvent(true);
  };

  updateClickedDay(initialsEvents, month);

  const getDayData = (
    date: { day: number; month: number; year: number },
    data?: EventType[],
  ) => {
    setDay(date.day);
    setMonth(date.month);
    setYear(date.year);
    setEventList(Array.isArray(data) ? data : []);
  };

  const nextDay = () => {
    setDay((prevDay) => {
      let newDay = prevDay + 1;
      let newMonth = month;
      let newYear = year;
      const daysInCurrentMonth = new Date(year, month, 0).getDate();

      if (newDay > daysInCurrentMonth) {
        newDay = 1;
        newMonth = month === 12 ? 1 : month + 1;
        newYear = month === 12 ? year + 1 : year;
        setMonth(newMonth);
        setYear(newYear);
      }

      setEventList(filterEV(newYear, newMonth, newDay, initialsEvents));
      return newDay;
    });
  };

  const prevDay = () => {
    setDay((prevDay) => {
      let newDay = prevDay - 1;
      let newMonth = month;
      let newYear = year;

      if (newDay < 1) {
        newMonth = month === 1 ? 12 : month - 1;
        newYear = month === 1 ? year - 1 : year;
        newDay = new Date(newYear, newMonth, 0).getDate();
        setMonth(newMonth);
        setYear(newYear);
      }

      setEventList(filterEV(newYear, newMonth, newDay, initialsEvents));
      return newDay;
    });
  };

  const actualDate = (months: { [key: number]: string }) => {
    const date = `${day}. ${months[month]}`;
    return date;
  };

  const handleNextClick = () => {
    if (month == 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else setMonth((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    if (month == 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else setMonth((prev) => prev - 1);
  };

  const handleTodayClick = () => {
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
    setEventList(defaultToday(initialsEvents, currentDate));
    setDay(currentDate.getDate());
  };

  const handleChange = (data?: any) => {
    if (data?.type === "edit") {
      const id = data?.data?.id;
      const updatedEvents = event.map((ev) =>
        ev.id === id ? (ev = data.data) : ev,
      );
      setEvent(updatedEvents);
      console.log(updatedEvents);

      setEventList(filterEV(year, month, day, updatedEvents));
    }
    if (data?.type === "delete") {
      const id = data?.data?.id;
      const updatedEvents = event.filter((ev) => ev.id !== id);

      setEvent(updatedEvents);
      setEventList(filterEV(year, month, day, updatedEvents));
    }

    if (data?.type === "add") {
      const newEvent = data?.data;
      const newEvents = [...event, newEvent];
      setEvent(newEvents);
      setEventList(filterEV(year, month, day, newEvents));
    }
  };
  const hideInput = () => {
    inputRef.current?.showPicker?.();
  };
  const showInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedDate = e.target.value.split("-");
    setYear(Number(pickedDate[0]));
    setMonth(Number(pickedDate[1]));
  };

  return {
    month,
    setMonth,
    year,
    event,
    handleNextClick,
    handlePrevClick,
    handleTodayClick,
    handleChange,
    showInputDate,
    hideInput,
    inputRef,
    getDayData,
    view,
    setView,
    eventList,
    nextDay,
    prevDay,
    actualDate,
    daysInMonth,
    day,
    addEvent,
    addEventCurrentDay,
    setAddEvent,
    dateInAdd,
  };
};
