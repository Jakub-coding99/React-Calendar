import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import type { EventType } from "../types/event";

interface Props {
  e?: EventType;
  onChange: (d: any) => void;
  onClose: () => void;
  type?: "edit" | "add";
  fillDate?: string;
}
//TODO: HOLD STATE OF SELECTED COLOR IN MODAL

export const Modal = ({ e, onChange, onClose, type, fillDate }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [date, setDate] = useState(e?.start.slice(0, 10) ?? fillDate ?? "");
  const [from, setFrom] = useState(e?.start.slice(11, 16) ?? "09:00");
  const [to, setTo] = useState(e?.end.slice(11, 16) ?? "10:00");
  const [endDate, setEndDate] = useState(e?.end.slice(0, 10) ?? fillDate ?? "");
  const [title, setTitle] = useState(e?.event);
  const [hideEditBtn, setHideEditBtn] = useState(false);
  const [color, setColor] = useState("");

  const isEdit = type === "edit";
  const isAdd = type === "add";

  useEffect(() => {
    if (e) {
      setTitle(e.event ?? "");
      setDate(e.start?.slice(0, 10) ?? fillDate ?? "");
      setFrom(e.start?.slice(11, 16) ?? "09:00");
      setEndDate(e.end?.slice(0, 10) ?? fillDate ?? "");
      setTo(e.end?.slice(11, 16) ?? "10:00");
    }
  }, [e, fillDate]);

  const deleteEvent = () => {
    const toDeleteEvent = {
      type: "delete",
      data: {
        id: e?.id,
      },
    };

    onChange(toDeleteEvent);
    onClose();
  };

  const editEvent = () => {
    setEditing(true);
    setHideEditBtn(true);
  };

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

      setEditing(false);
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
          color: color,
        },
      });
    }
    onClose();
  };

  const colors: string[] = [
    "#FF5733",
    "#33A1FF",
    "#33FF57",
    "#FF33A8",
    "#FFB533",
    "#8D33FF",
    "#33FFF6",
    "#FFD433",
  ];

  return (
    <>
      <div id="modal">
        <div className="d-flex flex-column justify-content-center">
          {((isEdit && isEditing) || isAdd) && (
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
                    className="color-pick"
                    onClick={() => setColor(color)}
                    style={{
                      background: color,
                      height: "25px",
                      width: "25px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      margin: "5px",
                    }}
                  ></div>
                ))}
              </div>

              <button type="submit">
                {type === "edit" ? "Uložit" : "Přidat"}
              </button>
            </form>
          )}

          {isEdit && !isEditing && (
            <div>
              <p>{title}</p>
              <p>
                začátek: {date} {from}
              </p>
              <p>
                konec: {endDate} {to}
              </p>
            </div>
          )}

          <div className="modal-actions">
            {isEdit && (
              <>
                <Button
                  className="modal-delete"
                  children="Smazat"
                  onClick={deleteEvent}
                />
                {!hideEditBtn && (
                  <Button children="Upravit" onClick={editEvent} />
                )}
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
