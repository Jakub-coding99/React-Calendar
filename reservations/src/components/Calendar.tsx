import { CalendarGrid } from "./CalendarGrid";
import { CalendarList } from "./CalendarList";
import { CalendarDay } from "./CalendarDay";
import { EventList } from "./EventList";
import {
  findFirstDay,
  formatDate,
  formatDateToDT,
  months,
} from "../utils/date";
import { listViewEvents } from "../utils/events";
import { View } from "../types/event";
import { useCalendar } from "../hooks/useCalendar";
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
    {
      event: "test",
      start: "2026-01-30T10:00",
      end: "2026-01-30T11:00",
      id: "6",
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
    modalState,
    setModalState,
    animate,
  } = useCalendar(mockedEvents);

  const openAddModal = (fillData?: string) => {
    setModalState({ action: "add", fillData });
  };

  const openEditModal = (event: EventType) => {
    setModalState({ action: "edit", event });
  };

  const openShowModal = (event: EventType) => {
    setModalState({ action: "show", event });
  };

  const eventsByDate: Record<string, typeof event> = {};

  event.forEach((ev) => {
    const date = ev.start.split("T")[0];
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push(ev);
  });

  const findDaysBeforeMonth = (year: number, month: number, type: string) => {
    if (type == "prev") {
      month--;
      if (month == 0) {
        month = 12;
        year--;
      }
    } else if (type == "next") {
      month++;
      if (month == 13) {
        month = 1;
        year++;
      }
    }

    return {
      year: year,
      month: month,
      daysNumber: type == "prev" ? new Date(year, month, 0).getDate() : 1,
    };
  };

  let arr = [];

  let prevMonthData = findDaysBeforeMonth(year, month, "prev");
  let nextMonthData = findDaysBeforeMonth(year, month, "next");

  let firstDay = findFirstDay(year, month);

  for (let i = firstDay - 1; i > 0; i--) {
    let prevDays = prevMonthData.daysNumber - i + 1;
    arr.push(
      <CalendarDay
        events={
          eventsByDate[
            `${prevMonthData.year}-${String(prevMonthData.month).padStart(2, "0")}-${String(prevDays).padStart(2, "0")}`
          ]
        }
        key={i}
        classVar="no-day"
        date={{
          day: prevDays,
          month: prevMonthData.month,
          year: prevMonthData.year,
        }}
        onDay={getDayData}
        showSelectedEvent={openShowModal}
      >
        {prevDays}
      </CalendarDay>,
    );
  }
  for (let d = 1; d <= daysInMonth; d++) {
    arr.push(
      <CalendarDay
        events={
          eventsByDate[
            `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`
          ]
        }
        date={{ day: d, month, year }}
        onDay={getDayData}
        classVar={
          `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}` !==
          Today
            ? undefined
            : "today"
        }
        showSelectedEvent={openShowModal}
      >
        {d}
      </CalendarDay>,
    );
  }

  let nextMonthDay = nextMonthData.daysNumber;
  while (arr.length < 42) {
    arr.push(
      <CalendarDay
        classVar="no-day"
        events={
          eventsByDate[
            `${nextMonthData.year}-${String(nextMonthData.month).padStart(2, "0")}-${String(nextMonthDay).padStart(2, "0")}`
          ]
        }
        onDay={getDayData}
        date={{
          day: nextMonthDay,
          month: nextMonthData.month,
          year: nextMonthData.year,
        }}
        showSelectedEvent={openShowModal}
      >
        {nextMonthDay}
      </CalendarDay>,
    );

    nextMonthDay++;
  }

  const days = ["PO", "ÚT", "ST", "ČT", "PÁ", "SO", "NE"];

  return (
    <>
      <div className="wrapper">
        <div className="calendar-header-wrapper">
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
            AddEventCurrentDay={openAddModal}
            setView={setView}
          />
        </div>
        <div className="calendar-column">
          <div className="calendar-wrapper">
            {view !== View.list ? (
              <div className="weekDaysContainer">
                {" "}
                <div className="weekDaysWrapper">
                  {days.map((day, index) => (
                    <div key={index} className="weekDays">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="weekDaysWrapperSpan"></div>
              </div>
            ) : undefined}

            <div className={`calendar-body-left ${animate}`}>
              <div className="">
                {view === View.list ? (
                  <CalendarList
                    events={listViewEvents(event, month)}
                    onSelectEvent={openEditModal}
                  />
                ) : (
                  <CalendarGrid arr={arr} />
                )}
              </div>
            </div>
            <div className="calendar-body-right">
              <EventList
                onSelectEvent={openEditModal}
                events={eventList.length > 0 ? eventList : []}
                eventDate={actualDate(months)}
                nextDay={nextDay}
                prevDay={prevDay}
                addEventCurrentDay={() =>
                  openAddModal(formatDateToDT(year, month, day))
                }
                deleteEvent={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {modalState && (
        <div id="modal-overlay" onClick={() => setModalState(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              e={modalState.event}
              onChange={handleChange}
              onClose={() => setModalState(null)}
              type={modalState.action}
              fillDate={modalState.fillData}
            />
          </div>
        </div>
      )}
    </>
  );
};
