import { CalendarGrid } from "./CalendarGrid";
import { CalendarList } from "./CalendarList";
import { CalendarDay } from "./CalendarDay";
import { EventList } from "./EventList";
import { findFirstDay, formatDate, formatDateToDT } from "../utils/date";
import { listViewEvents } from "../utils/events";
import { View } from "../types/event";
import { useCalendar } from "../hooks/useCalendar";
import { useState } from "react";
import { Modal } from "./Modal";
import type { EventType } from "../types/event";
import { CalendarHeader } from "./CalendarHeader";

export const Calendar = () => {
  const mockedEvents = [
    {
      event: "Střih",
      start: "2026-02-02T10:00",
      end: "2026-02-02T11:00",
      id: "1",
      color: "red",
    },
    {
      event: "Melír",
      start: "2026-02-03T10:00",
      end: "2026-02-03T11:00",
      id: "2",
      color: "blue",
    },
    {
      event: "Střih",
      start: "2026-02-04T10:00",
      end: "2026-02-04T11:00",
      id: "3",
      color: "blue",
    },
    {
      event: "Barva",
      start: "2026-03-04T10:00",
      end: "2026-03-04T11:00",
      id: "4",
      color: "green",
    },
    {
      event: "Barva",
      start: "2026-02-21T10:00",
      end: "2026-03-04T11:00",
      id: "5",
      color: "green",
    },
  ];
  const currentDate = new Date();
  const Today = formatDate(currentDate);

  const {
    month,
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
    setAddEvent,
    addEventCurrentDay,
    dateInAdd,
  } = useCalendar(mockedEvents);

  const months: { [key: number]: string } = {
    1: "leden",
    2: "únor",
    3: "březen",
    4: "duben",
    5: "květen",
    6: "červen",
    7: "červenec",
    8: "srpen",
    9: "září",
    10: "říjen",
    11: "listopad",
    12: "prosinec",
  };

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  let arr = [];
  let dayNumber = 0;

  for (let day = 1; day <= 42; day++) {
    const firstDay = findFirstDay(year, month);

    if (day < firstDay || dayNumber > daysInMonth) {
      arr.push(<CalendarDay key={day} classVar="no-day" />);
      continue;
    }
    dayNumber++;

    const dateObj = new Date(year, month - 1, dayNumber);
    const dayStr = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
    const eventsForDay = event.filter(
      (ev) => ev.start.split("T")[0] === dayStr,
    );

    arr.push(
      <CalendarDay
        classVar={Today === dayStr ? "today" : undefined}
        key={day}
        children={dayNumber}
        events={eventsForDay}
        onDay={getDayData}
      />,
    );
  }
  console.log(dateInAdd);
  return (
    <>
      <div className="wrapper d-flex flex-row">
        <div id="calendar">
          <CalendarHeader
            month={month}
            year={year}
            months={months}
            inputRef={inputRef}
            hideInput={hideInput}
            showInputDate={showInputDate}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
            handleTodayClick={handleTodayClick}
            AddEventCurrentDay={addEventCurrentDay}
            setView={setView}
          />
          <div className="calendarWrapper">
            {view == View.list ? (
              <CalendarList
                events={listViewEvents(event, month)}
                onSelectEvent={setSelectedEvent}
              />
            ) : (
              <CalendarGrid arr={arr} />
            )}
          </div>
        </div>

        <div className="day-event-list-wrapper">
          <EventList
            onSelectEvent={setSelectedEvent}
            events={eventList}
            eventDate={actualDate(months)}
            nextDay={nextDay}
            prevDay={prevDay}
            addEventCurrentDay={addEventCurrentDay}
          />
        </div>
      </div>

      {selectedEvent && (
        <div id="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              e={selectedEvent}
              onChange={handleChange}
              onClose={() => setSelectedEvent(null)}
              type="edit"
            />
          </div>
        </div>
      )}

      {addEvent && (
        <div id="modal-overlay" onClick={() => setAddEvent(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              onChange={handleChange}
              onClose={() => setAddEvent(false)}
              type="add"
              fillDate={
                dateInAdd ? formatDateToDT(year, month, day) : undefined
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
