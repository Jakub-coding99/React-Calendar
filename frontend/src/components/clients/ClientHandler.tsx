import { useState } from "react";
import type { Client } from "../../types/event";
import { useNavigate } from "react-router-dom";
import { useClients } from "../../hooks/useClients";

interface Props {
  client?: Client;
  type?: "edit" | "show" | "add";
  allClients: Client[];
}

export const ClientHandler = ({ client, type, allClients }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");

  const { handleClientAction } = useClients();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, phone, note, address);
    handleClientAction({
      type: "add",
      data: {
        name: name,
        phone: phone,
        email: email,
        note: note,
      },
    });
    navigate("/clients");
  };

  const [clientAction, setClientAction] = useState(type);
  return (
    <>
      {clientAction == "show" && (
        <div>
          <button onClick={() => setClientAction("edit")}>edit</button>
          <button onClick={() => navigate(-1)}>back</button>
          <div>{client?.name}</div>
          <div>{client?.phone}</div>
          <div>{client?.email}</div>
          <div>{client?.note}</div>
        </div>
      )}

      {clientAction == "edit" && (
        <form>
          <input type="text" defaultValue={client?.name} />
          <input type="text" defaultValue={client?.note} />
          <input type="text" defaultValue={client?.phone} />
          <input type="text" defaultValue={client?.email} />
        </form>
      )}

      {clientAction == "add" && (
        <div className="client-form">
          <h3>Nový klient</h3>
          <span>Základní informace</span>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="client-form-content">
              <div className=" row basic-info-section">
                <div className="row">
                  <label>Jméno</label>
                  <input
                    className="form-control m-2"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="row">
                  <label>E-mail</label>
                  <input
                    className="form-control m-2"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="row">
                  <label>Telefon</label>
                  <input
                    className="form-control m-2"
                    type="phone"
                    name=""
                    id=""
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="row detail-section">
                <div>
                  <div>Detaily</div>

                  <textarea
                    placeholder="Přidat poznámku"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="row address-section">
                <div>
                  <div>Adresa</div>

                  <input
                    type="text"
                    placeholder="Přidat adresu"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row form-footer-section">
              <input type="submit" value="uložit" />{" "}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
