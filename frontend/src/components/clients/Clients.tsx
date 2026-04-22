import { ClientSearch } from "./ClientSearch";
import { Tr } from "./Tr";

import type { Client } from "../../types/event";

import { useClients } from "../../hooks/useClients";
import { Dropdown } from "../Dropdown";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export const Clients = () => {
  const { clients, handleClientAction } = useClients();
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const headerItems = ["Jméno", "Email", "Telefon", "Poznámka", "Akce"];
  const navigate = useNavigate();

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
          <span
            className="m-1"
            onClick={() => navigate(`/manage-client?type=add`)}
          >
            pridat
          </span>
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
