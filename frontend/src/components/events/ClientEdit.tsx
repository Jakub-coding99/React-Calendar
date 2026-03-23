import type { ClientType } from "../../types/event";
import { useState, useEffect } from "react";

interface Props {
  client: ClientType;
}

export const ClientEdit = ({ client }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!client) return;
    setName(client.name ?? "");
    setPhone(client.phone ?? "");
    setEmail(client.email ?? "");
  }, [name, phone, email]);

  return (
    <div className="clients-modal">
      <div className="row">
        <form>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>
      </div>
    </div>
  );
};
