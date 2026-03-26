import type { ClientType } from "../../types/event";
import { useNavigate } from "react-router-dom";

interface Props {
  client?: ClientType;
  type?: "edit" | "show" | "add";
}

export const ClientHandler = ({ client, type }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {type == "show" && (
        <div>
          <button onClick={() => navigate(-1)}>back</button>
          <div>{client?.name}</div>
          <div>{client?.phone}</div>
          <div>{client?.email}</div>
          <div>{client?.note}</div>
        </div>
      )}

      {type == "edit" && (
        <form>
          <input type="text" value={client?.name} />
        </form>
      )}
    </>
  );
};
