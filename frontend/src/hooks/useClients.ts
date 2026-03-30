import { useEffect, useState } from "react";
import type { ClientType } from "../types/event";

export const useClients = (cl: ClientType[]) => {
  const [clients, setClient] = useState<ClientType[]>([]);
  useEffect(() => {
    setClient(cl);
  }, [cl]);

  const handleClientRequests = () => {
    console.log("klik v req");
  };

  return {
    clients,
    handleClientRequests,
  };
};
