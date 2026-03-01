import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import type { EventType } from "../types/event";
import { Alert } from "./Alert";
import { useDeleteEvent } from "../utils/eventActions";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { formatToPrettyDate } from "../utils/date";
import { TbClockHour4 } from "react-icons/tb";
import { MdNotes } from "react-icons/md";

interface Props {
  e: EventType;
  onChange: (d: any) => void;
  onClose: () => void;
  type?: "edit" | "add" | "show";
  fillDate?: string;
}

export const Modal = ({ e, onChange, onClose, type, fillDate }: Props) => {
  const [date, setDate] = useState(e?.start.slice(0, 10) ?? fillDate ?? "");
  const [from, setFrom] = useState(e?.start.slice(11, 16) ?? "09:00");
  const [to, setTo] = useState(e?.end.slice(11, 16) ?? "10:00");
  const [endDate, setEndDate] = useState(e?.end.slice(0, 10) ?? fillDate ?? "");
  const [title, setTitle] = useState(e?.event);

  const [eventColor, setEventColor] = useState("");

  const isEdit = type === "edit";
  const isAdd = type === "add";
  const isShow = type === "show";

  const { showAlert, handleDelete, triggerDelete, setShowAlert } =
    useDeleteEvent({
      e: e,
      onChange,
      onClose,
    });

  useEffect(() => {
    if (e) {
      setTitle(e.event ?? "");
      setDate(e.start?.slice(0, 10) ?? fillDate ?? "");
      setFrom(e.start?.slice(11, 16) ?? "09:00");
      setEndDate(e.end?.slice(0, 10) ?? fillDate ?? "");
      setTo(e.end?.slice(11, 16) ?? "10:00");
    }
  }, [e, fillDate]);

  const submitEvent = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (type == "edit") {
      onChange({
        type: "edit",
        data: {
          id: e?.id,
          event: title,
          start: `${date}T${from}:00`,
          end: `${endDate}T${to}:00`,
          color: e?.color,
        },
      });

      onClose();
    }
    if (type == "add") {
      onChange({
        type: "add",
        data: {
          id: "10",
          event: title,
          start: `${date}T${from}:00`,
          end: `${endDate}T${to}:00`,
          color: colors.includes(eventColor) ? eventColor : "#6594B1",
        },
      });
    }
    onClose();
  };

  const colors: string[] = [
    "#EA7B7B",
    "#6594B1",
    "#84B179",
    "#213C51",
    "#D25353",
    "#FACE68",
    "#898AC4",
  ];

  return (
    <>
      <div id="modal">
        <div className="d-flex flex-column justify-content-center">
          {(isEdit || isAdd) && (
            <form onSubmit={submitEvent}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Název události"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="date"
              />
              <input
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <div className="d-flex flex-row justify-content-center">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={
                      color == eventColor ? "color-pick choosen" : "color-pick"
                    }
                    onClick={() => setEventColor(color)}
                    style={{
                      background: color,
                      color: color,
                    }}
                  ></div>
                ))}
              </div>

              <button type="submit">
                {type === "edit" ? "Uložit" : "Přidat"}
              </button>
            </form>
          )}
          {isShow && (
            <div className="d-flex flex-column gap-4">
              <div className="modal-header-show d-flex flex-row d-flex justify-content-between align-items-center  w-100">
                <div
                  className="header-dot"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: e?.color,
                  }}
                ></div>

                <div className="d-flex flex-row ms-auto">
                  <Button
                    className="icon-btn"
                    onClick={() => {
                      onChange({ type: "switchToEdit", data: e });
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button className="icon-btn delete" onClick={triggerDelete}>
                    <RiDeleteBin6Line />
                  </Button>
                  <Button className="icon-btn" onClick={onClose}>
                    <IoMdClose />
                  </Button>
                </div>

                <div></div>
              </div>
              <div className="modal-show-details">
                <h2 className="fw-bold my-3">{e?.event}</h2>
                <span className="d-flex flex-row gap-2 my-3">
                  <HiOutlineCalendarDateRange size={28} />
                  <p>
                    {e.start.split("T")[0] === e.end.split("T")[0]
                      ? formatToPrettyDate(e.start.split("T")[0])
                      : `${formatToPrettyDate(e.start.split("T")[0])} - ${formatToPrettyDate(e.end.split("T")[0])}`}
                  </p>
                </span>
                <span className="d-flex flex-row gap-2 my-3">
                  <TbClockHour4 size={28} />
                  <p>
                    {e.start.split("T")[1]} - {e.end.split("T")[1]}
                  </p>
                </span>

                {e.note != undefined ? (
                  <div className="d-flex flex-column">
                    <span className="d-flex flex-row gap-2">
                      <MdNotes size={28} />
                      <p className="m-0">Poznámky</p>
                    </span>

                    <div
                      style={{
                        height: "20%",

                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <p
                        style={{
                          background: "whiteSmoke",
                          borderRadius: "8px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          padding: "8px",
                        }}
                      >
                        {e.note}
                      </p>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
          )}

          {showAlert && (
            <Alert
              confirm={handleDelete}
              close={() => setShowAlert(false)}
              children="Opravdu chcete událost smazat?"
            />
          )}
          <div className="modal-actions">
            {isEdit && (
              <>
                <Button
                  className="modal-delete"
                  children="Smazat"
                  onClick={triggerDelete}
                />
              </>
            )}
            <Button
              className="modal-close"
              children="Zavřít"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};
