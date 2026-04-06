import { ClientSearch } from "./ClientSearch";
import { Tr } from "./Tr";

import type { ClientType } from "../../types/event";

import { useClients } from "../../hooks/useClients";
import { Dropdown } from "../Dropdown";
import { useState } from "react";

interface Props {
  allClients: ClientType[];
}

export const Clients = ({ allClients }: Props) => {
  const { clients, handleClientAction } = useClients(allClients ?? []);
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const headerItems = ["Jméno", "Email", "Telefon", "Poznámka", "Akce"];

  return (
    <>
      <div className="clients-wrapper">
        <ClientSearch />
        <div className="clients-header d-flex flex-row">
          <h1 className="m-1">Klienti</h1>
          <span className="m-1">zobrazit</span>
          <span className="m-1">
            <div
              onClick={() => setOpenDropdown(true)}
              style={{ position: "relative" }}
            >
              filtr
              <div>
                {openDropdown && (
                  <Dropdown type="clientsHeader" close={closeDropdown} />
                )}
              </div>
            </div>
          </span>

          <span className="m-1">export</span>
          <span className="m-1">pridat</span>
        </div>
        <div className="clients-content">
          <div className="content-header">
            <table>
              <thead>
                <Tr headerData={headerItems} state="header" />
              </thead>
              <tbody>
                {clients?.map((client, key) => (
                  <Tr
                    key={key}
                    rowData={client}
                    state="content"
                    handleClientAction={handleClientAction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
