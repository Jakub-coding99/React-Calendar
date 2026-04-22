import { Clients } from "../components/clients/Clients";
import type { Client } from "../types/event";

export const ClientPage = () => {
  return (
    <div className="clients-page">
      <Clients />
    </div>
  );
};
