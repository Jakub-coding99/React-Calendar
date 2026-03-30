import { useState } from "react";
import type { ClientType } from "../../types/event";
import { useNavigate } from "react-router-dom";
import { useClients } from "../../hooks/useClients";

interface Props {
  client?: ClientType;
  type?: "edit" | "show" | "add";
  allClients: ClientType[];
}

export const ClientHandler = ({ client, type, allClients }: Props) => {
  const navigate = useNavigate();

  const { handleClientRequests } = useClients(allClients);

  const [clientAction, setClientAction] = useState(type);
  return (
    <>
      {clientAction != "edit" && (
        <button onClick={() => setClientAction("edit")}>edit</button>
      )}

      {clientAction == "show" && (
        <div>
          <button onClick={() => navigate(-1)}>back</button>
          <div>{client?.name}</div>
          <div>{client?.phone}</div>
          <div>{client?.email}</div>
          <div>{client?.note}</div>
          <button onClick={() => handleClientRequests()}>
            test zda funguje
          </button>
        </div>
      )}

      {clientAction == "edit" && (
        <form>
          <input type="text" defaultValue={client?.name} />
          <input type="text" defaultValue={client?.note} />
          <input type="text" defaultValue={client?.phone} />
          <input type="text" defaultValue={client?.email} />
        </form>
      )}
    </>
  );
};
