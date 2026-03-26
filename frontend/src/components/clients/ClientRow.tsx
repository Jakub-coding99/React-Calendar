import type { ClientType } from "../../types/event";

interface Props {
  client: ClientType;
}

export const ClientRow = ({ client }: Props) => {
  return (
    <div className="d-flex flex-row client-row">
      <span>{client.id}</span>
      <span>{client.name}</span>
    </div>
  );
};
