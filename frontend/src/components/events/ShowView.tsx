import { Button } from "../Button";
import type { EventType } from "../../types/event";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { formatToPrettyDate } from "../../utils/date";
import { TbClockHour4 } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
  e: EventType;
  del: () => void;
  onChange: (d: any) => void;
}

export const ShowView = ({ e, del, onChange }: Props) => {
  return (
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
          <Button className="icon-btn delete" onClick={() => del()}>
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

          <div className="row mt-3">
            <span className="sms-status-row">
              Posílat SMS:
              {e.msg_enabled ? (
                <FaCheck style={{ color: "#10b981", fontSize: "1.3em" }} />
              ) : (
                <FaTimes style={{ color: "#ef4444", fontSize: "1.3em" }} />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="col-auto d-flex justify-content-center">
        <div className="d-flex justify-content-center"></div>
      </div>
    </div>
  );
};
