import { useState } from "react";
import type { ClientType } from "../../types/event";

interface Props {
  clients?: ClientType;
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
      onChange={(e) => findClient(e.target.value)}
    />
  );
};
