import { ClientHandler } from "../components/clients/ClientHandler";
import { useParams, useSearchParams } from "react-router-dom";
import { getClient } from "../api/clients";
import { useEffect, useState } from "react";
import type { Client } from "../types/event";

interface Props {
  allClients: Client[];
}

export const ManageClientPage = ({ allClients }: Props) => {
  const { id } = useParams();
  const [params] = useSearchParams();

  const allowedTypes = ["add", "edit", "show"] as const;
  type Type = (typeof allowedTypes)[number];
  const typeParam = params.get("type");
  const type = allowedTypes.includes(typeParam as Type)
    ? (typeParam as Type)
    : undefined;

  const [client, setClient] = useState<Client>();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClient(Number(id));
      setClient(client);
    };
    if (id) fetchClient();
  }, [id]);

  return <ClientHandler type={type} client={client} allClients={allClients} />;
};
