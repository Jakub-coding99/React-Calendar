import { Clients } from "../components/clients/Clients";
import type { ClientType } from "../types/event";

interface Props {
  allClients: ClientType[];
}

export const ClientPage = ({ allClients }: Props) => {
  return (
    <div className="clients-page">
      <Clients allClients={allClients} />
    </div>
  );
};
