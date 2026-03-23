import type { ClientType } from "../../types/event";
import { FaPlus } from "react-icons/fa";

interface Props {
  clients: ClientType[];
  handleClientClick: (client: ClientType) => void;
}

export const ClientPick = ({ clients, handleClientClick }: Props) => {
  return (
    <div className="clients-modal">
      <div className="row">
        <div className="d-flex flex-row">
          <input type="" placeholder="Vyhledat" />
          <button>Zrušit</button>
        </div>
      </div>

      <div className="row">
        <div className="clients-list d-flex flex-column">
          <div className="new-client-btn">
            <span className="new-client-plus">
              <FaPlus />
            </span>
            <span>Nový klient</span>
          </div>
          {clients?.map((client, index) => (
            <div onClick={() => handleClientClick(client)} key={index}>
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
