import { useState, useRef, useEffect } from "react";
import type { EventType, ModalState } from "../types/event";
import { View } from "../types/event";
import { updateClickedDay } from "../utils/events";
import { filterEV, defaultToday } from "../utils/events";
import { createEvent, deleteEvent, editEvent } from "../api/reservations";

// EDIT EVENT FUNCTIONS
export const useCalendar = (initialsEvents: EventType[]) => {
  useEffect(() => {
    if (initialsEvents.length > 0) {
      setEvent(initialsEvents);
      setEventList(defaultToday(initialsEvents, currentDate));
    }
  }, [initialsEvents]);

  const currentDate = new Date();
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [event, setEvent] = useState(initialsEvents);
  const [view, setView] = useState<View>(View.month);

  const [eventList, setEventList] = useState<EventType[]>(
    defaultToday(initialsEvents, currentDate),
  );
  const [day, setDay] = useState(currentDate.getDate());
  const [addEvent, setAddEvent] = useState(false);
  let [width, setWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const d = (y: number, m: number) => new Date(y, m, 0).getDate();
  const daysInMonth = d(year, month);

  const checkView = () => {
    useEffect(() => {
      const handleWidth = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWidth);
      handleWidth();
      return () => {
        window.removeEventListener("resize", handleWidth);
      };
    }, [setWidth]);
    return width;
  };
  const widthOfScreen = checkView();

  const addEventCurrentDay = (info?: string) => {
    const todayDate = new Date().toISOString().split("T")[0];

    let fillDate: string;
    if (info === "adding-from-event-list") {
      fillDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    } else {
      fillDate = todayDate;
    }

    setModalState({ action: "add", fillData: fillDate });
  };
  updateClickedDay(initialsEvents, month);

  const getDayData = (
    date: { day: number; month: number; year: number },
    data?: EventType[],
  ) => {
    if (widthOfScreen < 1024) {
      setView(View.day);
    }

    setDay(date.day);
    setMonth(date.month);
    setYear(date.year);
    setEventList(Array.isArray(data) ? data : []);
  };

  const actualDate = (months: { [key: number]: string }) => {
    const date = `${day}. ${months[month]}`;
    return date;
  };

  const [animate, setAnimate] = useState("");

  const handleNextClick = (type?: string) => {
    if ((view == View.day && width < 1200) || type == "day-view") {
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
      return;
    }

    if (month == 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else setMonth((prev) => prev + 1);

    setAnimate("slide-left");
    setTimeout(() => {
      setAnimate("");
    }, 300);
  };

  const handlePrevClick = (type?: string) => {
    if ((view == View.day && width < 1200) || type == "day-view") {
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
      return;
    }

    if (month == 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else setMonth((prev) => prev - 1);

    setAnimate("slide-right");
    setTimeout(() => {
      setAnimate("");
    }, 300);
  };

  const handleTodayClick = () => {
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
    setEventList(defaultToday(initialsEvents, currentDate));
    setDay(currentDate.getDate());
    setAnimate("anime-today");
    setTimeout(() => {
      setAnimate("");
    }, 300);
  };

  const handleChange = (data?: any) => {
    if (data?.type === "edit") {
      const editableEvent = data?.data;
      if (!editableEvent) return;
      editEvent(editableEvent);

      const updatedEvents =
        editableEvent.id == null
          ? [...event, editableEvent]
          : event.some((ev) => ev.id === editableEvent.id)
            ? event.map((ev) =>
                ev.id === editableEvent.id ? editableEvent : ev,
              )
            : [...event, editableEvent];
      setEvent(updatedEvents);
      setEventList(filterEV(year, month, day, updatedEvents));
    }
    if (data?.type === "delete") {
      const id = data?.data?.id;
      if (id == null) return;

      deleteEvent(id);
      const updatedEvents = event.filter((ev) => ev.id !== id);
      setEvent(updatedEvents);
      setEventList(filterEV(year, month, day, updatedEvents));
    }

    if (data?.type === "add") {
      const newEvent = data?.data;
      createEvent(newEvent);

      const newEvents = [...event, newEvent];
      setEvent(newEvents);
      setEventList(filterEV(year, month, day, newEvents));
    }

    if (data?.type == "switchToEdit") {
      setModalState({ event: data.data, action: "edit" });
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

    actualDate,
    daysInMonth,
    day,
    addEvent,
    addEventCurrentDay,
    setAddEvent,
    setModalState,
    modalState,
    animate,
    width,
  };
};
