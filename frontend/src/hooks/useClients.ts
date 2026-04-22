import { useEffect, useState } from "react";
import type { Client, ClientAction } from "../types/event";
import { createClient, deleteClient, fetchClients } from "../api/clients";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = async () => {
    const data = await fetchClients();
    console.log(`načítam klienty:${data}`);
    setClients(data);
    if (data.ok) return true;
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleClientRequests = () => {
    console.log("klik v req");
  };

  const handleClientAction = async (data?: ClientAction) => {
    if (!data) return;
    if (data.type === "delete") {
      await deleteClient(data.data.id);
      await loadClients();
      return;
    }
    if (data.type === "add") {
      await createClient(data.data);
      await loadClients();
      return;
    }
    if (data.type === "edit") {
      // zde by měla být funkce pro editaci klienta, např. updateClient(data.data)
      // zatím není implementováno
    }
  };

  return {
    clients,
    handleClientRequests,
    handleClientAction,
  };
};
