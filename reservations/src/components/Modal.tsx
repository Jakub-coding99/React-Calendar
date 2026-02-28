import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import type { EventType } from "../types/event";
import { Alert } from "./Alert";
import { useDeleteEvent } from "../utils/eventActions";

interface Props {
  e?: EventType;
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
      e: e!,
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

  // const handleDelete = () => {
  //   const toDeleteEvent = {
  //     type: "delete",
  //     data: {
  //       id: e?.id,
  //     },
  //   };
  //   onChange(toDeleteEvent);
  //   onClose();
  // };

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
            <div className="modal-show-details">
              <h2>{e?.event}</h2>
              <p>Od: {e?.start}</p>
              <p>Do: {e?.end}</p>
              <p>Barva: {e?.color}</p>
              <Button
                className="modal-edit"
                children="Editovat"
                onClick={() => {
                  onChange({ type: "switchToEdit", data: e });
                }}
              />
              <Button
                className="modal-delete"
                children="smazat"
                onClick={triggerDelete}
              />
            </div>
          )}{" "}
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
