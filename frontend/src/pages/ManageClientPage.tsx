import { ClientHandler } from "../components/clients/ClientHandler";
import { useParams, useSearchParams } from "react-router-dom";
import { getClient } from "../api/reservations";
import { useEffect, useState } from "react";
import type { ClientType } from "../types/event";

export const ManageClientPage = () => {
  const { id } = useParams();
  const [params] = useSearchParams();

  const allowedTypes = ["add", "edit", "show"] as const;
  type Type = (typeof allowedTypes)[number];
  const typeParam = params.get("type");
  const type = allowedTypes.includes(typeParam as Type)
    ? (typeParam as Type)
    : undefined;

  const [client, setClient] = useState<ClientType>();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClient(Number(id));
      setClient(client);
    };
    if (id) fetchClient();
  }, [id]);

  return <ClientHandler type={type} client={client} />;
};
