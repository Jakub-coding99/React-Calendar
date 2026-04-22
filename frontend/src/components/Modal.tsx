import { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import type { EventType, Client, ModalActions } from "../types/event";
import { Alert } from "./Alert";
import { useDeleteEvent } from "../utils/eventActions";
import { ShowView } from "./events/ShowView";
import { ClientPick } from "./events/ClientPick";
import { EventForm } from "./events/EventForm";
import { ClientEdit } from "./events/ClientEdit";

interface Props {
  e: EventType;
  onChange: (d: any) => void;
  onClose: () => void;
  type: ModalActions;
  fillDate?: string;
  clients: Client[];
  eventBackup?: boolean;
  clientBackup?: Client;
}

export const Modal = ({
  e,
  onChange,
  onClose,
  type,
  fillDate,
  clients,
  eventBackup,
  clientBackup,
}: Props) => {
  const [client, setClient] = useState<Client>();

  const userAction = useRef("");
  if (type == "add" || type == "edit") {
    userAction.current = type;
  }

  let isEdit = type == "edit";
  let isAdd = type == "add";
  let isShow = type == "show";
  let clientEdit = type == "clientEditSwitch";

  useEffect(() => {
    if (eventBackup) {
      setClient(clientBackup);
    }
  }, [eventBackup]);

  const { showAlert, handleDelete, triggerDelete, setShowAlert } =
    useDeleteEvent({
      e: e,
      onChange,
      onClose,
    });

  const headerState = () => {
    if (isAdd && !client) return "Zvolte klienta";
    else if (isAdd) return "Nová událost";
    return undefined;
  };
  let [recovery, setRecovery] = useState<EventType | null>();

  //choosing client from list of clients
  const handleClientClick = (client: Client) => {
    setClient(client);
  };

  const editCurrentClient = (client?: Client, recovery?: EventType) => {
    if (!client) return;
    setRecovery(recovery);
    setClient(client);
    onChange({
      type: "clientEditSwitch",
      data: {
        client_id: client.id,
      },
    });
  };
  const returnPreviousData = () => {
    onChange({
      type: "returnPreviousData",
      data: recovery,
    });
  };

  return (
    <>
      <div id="modal">
        <div className="modal-header">
          <div className="row mb-3">
            <div className="col d-flex justify-content-center fw-bold">
              <span>{headerState()}</span>
            </div>
          </div>
        </div>
        {isShow && <ShowView e={e} del={triggerDelete} onChange={onChange} />}
        {isAdd && !client && (
          <ClientPick clients={clients} handleClientClick={handleClientClick} />
        )}

        {((isAdd && client) || isEdit) && (
          <EventForm
            e={e}
            onChange={onChange}
            onClose={onClose}
            type={type}
            fillDate={fillDate}
            client={client}
            handleClient={editCurrentClient}
          />
        )}

        {clientEdit && (
          <ClientEdit
            client={client}
            goToPrevious={returnPreviousData}
            type={userAction.current}
            recovery={recovery}
          />
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

          {(isAdd && client) || isEdit ? (
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
