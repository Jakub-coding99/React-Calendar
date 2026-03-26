import type { ClientType, EventType } from "../../types/event";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  client?: ClientType;
  goToPrevious: () => void;
  recovery: EventType | null | undefined;
  type: string;
}

export const ClientEdit = ({ client, goToPrevious, recovery, type }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!client) return;
    setName(client.name ?? "");
    setPhone(client.phone ?? "");
    setEmail(client.email ?? "");
  }, [name, phone, email]);

  const navigate = useNavigate();

  const handleRedirectData = () => {
    navigate({
      pathname: `/manage-client/${client?.id}`,
      search: "?type=show",
    });
    const recoveryData = JSON.stringify({
      type: type,
      recovery: JSON.stringify(recovery),
    });
    localStorage.setItem("recovery", recoveryData);
    sessionStorage.setItem("recovery", recoveryData);
  };

  return (
    <div className="clients-modal">
      <div className="row">
        {/* TADY POSLAT DATA */}
        {/* <button onClick = {() => navigate({
          pathname: `/manage-client/${client.id}`,
          search: "?type=show" }
          )}>klik</button> */}
        <button onClick={() => handleRedirectData()}>klik</button>

        <button onClick={() => goToPrevious()}>back</button>

        <form>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>
      </div>
    </div>
  );
};
