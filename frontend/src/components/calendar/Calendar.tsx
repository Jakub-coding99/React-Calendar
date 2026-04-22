import { CalendarGrid } from "./CalendarGrid";
import { CalendarList } from "./CalendarList";
import { CalendarDay } from "./CalendarDay";
import { EventList } from "./EventList";
import {
  findFirstDay,
  formatDate,
  formatDateToDT,
  months,
} from "../../utils/date";
import { listViewEvents } from "../../utils/events";
import { View } from "../../types/event";
import { useCalendar } from "../../hooks/useCalendar";
import { Modal } from "../Modal";
import type { Client, EventType } from "../../types/event";
import { CalendarHeader } from "./CalendarHeader";
import { useEffect, useRef, useState } from "react";
import { getClient } from "../../api/clients";

interface Props {
  allClients: Client[];
  allEvents: EventType[];
}

export const Calendar = ({ allClients, allEvents }: Props) => {
  const effectRan = useRef(false);

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
    actualDate,
    daysInMonth,
    day,
    modalState,
    setModalState,
    animate,
    width,
    addEventCurrentDay,
  } = useCalendar(allEvents ?? []);

  const openAddModal = (fillData?: string) => {
    setModalState((prev) => ({ ...prev, action: "add", fillData }));
  };

  const openEditModal = (event: EventType) => {
    setModalState((prev) => ({ ...prev, action: "edit", event }));
  };

  const openShowModal = (event: EventType) => {
    setModalState((prev) => ({ ...prev, action: "show", event }));
  };

  const eventsByDate: Record<string, EventType[]> = {};

  event.forEach((ev) => {
    const date = ev.start.split("T")[0];
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push(ev);
    eventsByDate[date].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
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
        width={width}
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

  const loadClientAndSetData = async (storageData: string) => {
    const parsed = JSON.parse(storageData);
    const parsed_event = JSON.parse(parsed.recovery);

    let recoveryEvent = {
      id: parsed_event.id,
      event: parsed_event.event,
      start: `${parsed_event.start}:00`,
      end: `${parsed_event.end}:00`,
      color: parsed_event.color,
      note: parsed_event.note,
      location: parsed_event.location,
      msg_enabled: parsed_event.msg_enabled,
      client_id: parsed_event.client_id,
      client: await getClient(Number(parsed_event.client_id)),
      eventAction: parsed.type,
    };
    return recoveryEvent;
  };

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const init = async () => {
      const isLocalData = localStorage.getItem("recovery");
      const isSessionData = sessionStorage.getItem("recovery");

      if (isSessionData) {
        const recoveryEvent = await loadClientAndSetData(isSessionData);
        setModalState((prev) => ({
          ...prev,
          action: recoveryEvent.eventAction,
          event: recoveryEvent,
          clientBackup: recoveryEvent.client,
          eventBackup: true,
        }));
      } else if (isLocalData) {
        const conf = confirm("Chcete načíst poslední data?");

        if (conf) {
          const recoveryEvent = await loadClientAndSetData(isLocalData);
          setModalState((prev) => ({
            ...prev,
            action: recoveryEvent.eventAction,
            event: recoveryEvent,
            clientBackup: recoveryEvent.client,
            eventBackup: true,
          }));
        }
      }
      sessionStorage.removeItem("recovery");
      localStorage.removeItem("recovery");
    };
    init();
  }, []);

  const renderView = () => {
    switch (view) {
      case View.list:
        return (
          <CalendarList
            events={listViewEvents(event, month)}
            onSelectEvent={openShowModal}
          />
        );

      case View.month:
        return <CalendarGrid arr={arr} />;

      case View.day:
        return (
          <EventList
            onSelectEvent={openEditModal}
            events={eventList.length > 0 ? eventList : []}
            eventDate={actualDate(months)}
            nextDay={handleNextClick}
            prevDay={handlePrevClick}
            addEventCurrentDay={() =>
              openAddModal(formatDateToDT(year, month, day))
            }
            deleteEvent={handleChange}
            width={width}
            onClick={openShowModal}
          />
        );
    }
  };

  const renderedView = renderView();
  // let clientsData = [{ name: "Jakub", id: 1, phone: "123456789" }];

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
            AddEventCurrentDay={addEventCurrentDay}
            setView={setView}
            view={view}
          />
        </div>
        <div className="calendar-column">
          <div className="calendar-wrapper">
            {view == View.month ? (
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
              {renderedView}
            </div>

            <div className="calendar-body-right">
              <EventList
                onSelectEvent={openEditModal}
                events={eventList.length > 0 ? eventList : []}
                eventDate={actualDate(months)}
                nextDay={handleNextClick}
                prevDay={handlePrevClick}
                addEventCurrentDay={() =>
                  openAddModal(formatDateToDT(year, month, day))
                }
                deleteEvent={handleChange}
                onClick={openShowModal}
                width={width}
              />
            </div>
          </div>
        </div>
      </div>

      {modalState && (
        <div id="modal-overlay" onClick={() => setModalState(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              e={modalState.event!}
              onChange={handleChange}
              onClose={() => setModalState(null)}
              type={modalState.action}
              fillDate={modalState.fillData}
              clients={allClients}
              eventBackup={modalState.eventBackup}
              clientBackup={modalState.clientBackup}
            />
          </div>
        </div>
      )}
    </>
  );
};
