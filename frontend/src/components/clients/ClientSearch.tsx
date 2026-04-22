import { useState } from "react";
import type { Client } from "../../types/event";

interface Props {
  clients?: Client;
}

export const ClientSearch = ({ clients }: Props) => {
  let [result, setResult] = useState("");

  const findClient = (res: string) => {
    setResult(res);
    // useEffect(() => {
    //   if (res) {
    //     setResult(res)
    //     console.log(result)

    //   }

    // }, [result])
  };

  return (
    <input
      type="search"
      placeholder="hledat"
      className="client-search-input"
      onChange={(e) => findClient(e.target.value)}
    />
  );
};
