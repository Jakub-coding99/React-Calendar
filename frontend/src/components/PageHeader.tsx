import { Link } from "react-router-dom";

export const PageHeader = () => {
  return (
    <nav>
      <ul className="d-flex flex-row m-3">
        <li className="m-2">
          <Link to="/">Rezervace</Link>
        </li>

        <li className="m-2">
          <Link to="/clients">Klienti</Link>
        </li>
      </ul>
    </nav>
  );
};
