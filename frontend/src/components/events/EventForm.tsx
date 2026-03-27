import { useState, useMemo, useEffect } from "react";
import type { EventType, ClientType, ModalActions } from "../../types/event";
import { MdNotes } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  e: EventType;
  onChange: (d: any) => void;
  onClose: () => void;
  type: ModalActions;
  fillDate?: string;
  client?: ClientType;
  handleClient: (client?: ClientType, recovery?: EventType) => void;
  recoveryData?: EventType;
}

export const EventForm = ({
  e,
  onChange,
  onClose,
  type,
  fillDate,
  client,
  handleClient,
}: Props) => {
  const [currentClient, setCurrentClient] = useState<ClientType | undefined>(
    client,
  );
  const [clientName, setClientName] = useState(currentClient?.name ?? "");

  const [eventDescription, setEventDescription] = useState("");
  const [date, setDate] = useState(e?.start.slice(0, 10) ?? fillDate ?? "");
  const [from, setFrom] = useState(e?.start.slice(11, 16) ?? "09:00");
  const [to, setTo] = useState(e?.end.slice(11, 16) ?? "10:00");
  const [endDate, setEndDate] = useState(e?.end.slice(0, 10) ?? fillDate ?? "");
  const [eventColor, setEventColor] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  // const isEdit = type === "edit";
  const isAdd = type === "add";

  useEffect(() => {
    if (!e) return;
    const newClient = e.client ?? client;

    setCurrentClient(newClient);
    setClientName(newClient?.name ?? "");
    // setClientPhone(newClient.phone ?? "");

    setEventDescription(e.event ?? "");
    setDate(e.start?.slice(0, 10) ?? fillDate ?? "");
    setFrom(e.start?.slice(11, 16) ?? "09:00");
    setEndDate(e.end?.slice(0, 10) ?? fillDate ?? "");
    setTo(e.end?.slice(11, 16) ?? "10:00");
    setNote(e.note ?? "");
    setLocation(e.location ?? "");
    setEventColor(e.color ?? "");
    setIsChecked(e.msg_enabled ?? true);
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
          event: eventDescription,
          start: `${date}T${from}`,
          end: `${endDate}T${to}`,
          color: eventColor ? eventColor : e.color,
          note: note,
          location: location,
          msg_enabled: isChecked,
          client_id: currentClient?.id,
        },
      });

      onClose();
    }
    if (type == "add") {
      onChange({
        type: "add",
        data: {
          event: eventDescription,
          start: `${date}T${from}`,
          end: `${endDate}T${to}`,
          color: colors.includes(eventColor) ? eventColor : "#6594B1",
          note: note,
          location: location,
          msg_enabled: isChecked,
          client_id: client?.id,
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
  const getRecovery = () => {
    let data = {
      id: e?.id,
      event: eventDescription,
      start: `${date}T${from}`,
      end: `${endDate}T${to}`,
      color: eventColor || e.color || "",
      note: note,
      location: location,
      msg_enabled: isChecked,
      client_id: currentClient?.id,
    };
    console.log("recovery-data");
    console.log(data);
    return data;
  };

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
    <div className="modal-content">
      <form id="event-form" onSubmit={submitEvent}>
        <div className="row mb-2">
          <div className="col-12">
            <span onClick={() => handleClient(currentClient, getRecovery())}>
              {clientName}
            </span>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <label>Událost</label>
            <input
              type="text"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
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
  );
};
