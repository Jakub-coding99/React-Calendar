import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import type { EventType } from "../types/event";
import { Alert } from "./Alert";
import { useDeleteEvent } from "../utils/eventActions";
import { FaEdit,FaPhoneAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { formatToPrettyDate } from "../utils/date";
import { TbClockHour4 } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";



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
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [phone,setPhone] = useState("")

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
      setNote(e.note ?? "");
      setLocation(e.location ?? "");
      setIsChecked(e.msg_enabled ?? true);
      setPhone(e.phone ?? "")
    }
  }, [e, fillDate]);

  const submitEvent = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!checkDateDiff) {
      setShowErrorMsg(true);
      return;
    }

    if (type == "edit") {
      onChange({
        type: "edit",
        data: {
          id: e?.id,
          event: title,
          start: `${date}T${from}`,
          end: `${endDate}T${to}`,
          color: eventColor ? eventColor : e.color,
          note: note,
          location: location,
          msg_enabled: isChecked,
          phone: phone
        },
      });

      onClose();
    }
    if (type == "add") {
      onChange({
        type: "add",
        data: {
          // id: "10",
          event: title,
          start: `${date}T${from}`,
          end: `${endDate}T${to}`,
          color: colors.includes(eventColor) ? eventColor : "#6594B1",
          note: note,
          location: location,
          msg_enabled: isChecked,
          phone: phone,
        },
      });
    }
    onClose();
  };

  const colors: string[] = [
    "#EF5350",
    "#42A5F5",
    "#66BB6A",
    "#FFA726",
    "#AB47BC",
    "#26C6DA",
    "#FFD54F",
    "#90A4AE",
  ];

  const checkDateDiff = useMemo(() => {
    const t1 = new Date(`${date}T${from}`);
    const t2 = new Date(`${endDate}T${to}`);
    const dateDiff = t2.getTime() - t1.getTime();
    const result = dateDiff > 0 ? true : false;
    if (result) {
      setShowErrorMsg(false);
    }
    return result;
  }, [date, endDate, to, from]);

  return (
    <>
      <div id="modal">
        <div className="modal-header">
          <div className="row mb-3">
            <div className="col d-flex justify-content-center fw-bold">
              <span>{isAdd ? "Nová událost" : undefined}</span>
            </div>
          </div>
        </div>

        {(isEdit || isAdd) && (
          <div className="modal-content">
            <form id="event-form" onSubmit={submitEvent}>
              <div className="row mb-2">
                <div className="col-12">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Název události"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <label className="mx-2">Začátek</label>
              <div className="row mb-2">
                <div className="col-6">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (isAdd) setEndDate(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <label className="mx-2">Konec</label>
              <div className="row mb-2">
                <div className="col-6">
                  <input
                    type="date"
                    value={endDate}
                    className={`form-control input-wrapper ${
                      !checkDateDiff ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    value={to}
                    className={`form-control input-wrapper ${
                      !checkDateDiff ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
              {showErrorMsg && (
                <div className="d-flex justify-content-center error-form">
                  <div>Datum začátku musí být před datem konce!</div>
                </div>
              )}
              <div className="d-flex flex-row mb-2 justify-content-center">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={
                      color == eventColor || (e?.color == color && !eventColor)
                        ? "color-pick choosen"
                        : "color-pick"
                    }
                    onClick={() => setEventColor(color)}
                    style={{
                      background: color,
                      color: color,
                    }}
                  ></div>
                ))}
              </div>

                <div className="row mb-2 m-1">
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      <FaPhoneAlt size={20} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Telefonní číslo"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-2 m-3 bg-white border-0 w-50 p-2 ">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    id="enable-sms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <label htmlFor="enable-sms" className="mb-0">
                    Posílat SMS
                  </label>
                </div>
              </div>

              <div className="row mb-2 m-1">
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      <FaLocationDot size={20} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Přidat lokalitu"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    />
                  </div>
                </div>
              </div>

            

              <div className="row mb-2 m-1">
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      <MdNotes size={20} />
                    </span>
                    <textarea
                      className="form-control border-0 shadow-none"
                      placeholder="Přidat poznámku"
                      rows={3}
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                      style={{
                        resize: "vertical",
                        backgroundColor: "#f8f9fa",
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {isShow && (
          <div className="row gap-3">
            <div className="modal-header-show  d-flex flex-row d-flex justify-content-between align-items-center   w-100">
              <div
                className="header-dot"
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  background: e?.color,
                }}
              ></div>

              <div className="d-flex flex-row ms-auto  ">
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
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-show-details m-2">
                <h2 className="fw-bold my-3 mb-4">{e?.event}</h2>
                <span className="d-flex flex-row mb-3 my-3 align-items-center">
                  <HiOutlineCalendarDateRange size={28} />
                  <p className="m-2">
                    {e.start.split("T")[0] === e.end.split("T")[0]
                      ? formatToPrettyDate(e.start.split("T")[0])
                      : `${formatToPrettyDate(
                          e.start.split("T")[0],
                        )} - ${formatToPrettyDate(e.end.split("T")[0])}`}
                  </p>
                </span>
                <span className="d-flex flex-row gap-2 mb-3 my-3">
                  <TbClockHour4 size={28} />
                  <p>
                    {e.start.split("T")[1]} - {e.end.split("T")[1]}
                  </p>
                </span>

                {e.note != undefined ? (
                  <div className="d-flex flex-column mb-3 my-3 gap-2">
                    <span className="d-flex flex-row gap-2">
                      <MdNotes size={28} />
                      <p className="m-0">Poznámky</p>
                    </span>

                    <div
                      style={{
                        height: "15%",

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
                          border: "1px solid #dee2e6",
                        }}
                      >
                        {e.note}
                      </p>
                    </div>
                  </div>
                ) : undefined}

                {e.location ? (
                  <div className="event-location mb-3 my-3 d-flex flex-row gap-2 align-items-center">
                    <div className="location-icon">
                      <FaLocationDot />
                    </div>
                    <p>{e.location}</p>
                  </div>
                ) : undefined}

                {e.phone ? (
                  <span className="event-location mb-3 my-3 d-flex flex-row gap-2 align-items-center">
                    <FaPhoneAlt size={20} />
                    <p className="m-0">{e.phone}</p>
                  </span>
                ) : undefined}

                <div className="row mt-3">
                  <span className="sms-status-row">
                    Posílat SMS:
                    {e.msg_enabled ? (
                      <FaCheck
                        style={{ color: "#10b981", fontSize: "1.3em" }}
                      />
                    ) : (
                      <FaTimes
                        style={{ color: "#ef4444", fontSize: "1.3em" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-auto d-flex justify-content-center">
              <div className="d-flex justify-content-center"></div>
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

        <div
          className={`modal-actions  ${
            !isEdit ? "justify-content-center" : undefined
          }`}
        >
          {isEdit && (
            <div className="row">
              <Button className="modal-delete m-3 p-3" onClick={triggerDelete}>
                Smazat
              </Button>
            </div>
          )}

          {isAdd || isEdit ? (
            <div className="row mb-2 d-flex justify-content-between">
              <div className="col-auto">
                <button
                  type="submit"
                  form="event-form"
                  className="btn btn-primary m-3 p-3"
                >
                  {type === "edit" ? "Uložit" : "Přidat"}
                </button>
              </div>
            </div>
          ) : undefined}

          <Button
            className="modal-close bg-secondary text-white m-3 p-3"
            onClick={onClose}
          >
            Zavřít
          </Button>
        </div>
      </div>
    </>
  );
};
