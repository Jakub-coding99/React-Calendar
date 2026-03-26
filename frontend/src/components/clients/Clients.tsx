import { ClientSearch } from "./ClientSearch";
import { Tr } from "./Tr";

export const Clients = () => {
  let clientsData = [
    {
      name: "Jakub",
      id: 1,
      phone: "123456789",
      email: "test@test.cz",
      note: "test",
    },
    { name: "Markéta", id: 2, phone: "987654321", email: "test@test" },
  ];

  const headerItems = ["Jméno", "Email", "Telefon", "Poznámka", "Akce"];

  return (
    <>
      <div className="clients-wrapper">
        <ClientSearch />
        <div className="clients-header d-flex flex-row">
          <h1 className="m-1">Klienti</h1>
          <span className="m-1">zobrazit</span>
          <span className="m-1">filtr</span>
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
                {clientsData.map((client) => (
                  <Tr rowData={client} state="content" />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
