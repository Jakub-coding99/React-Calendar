import type { ClientType } from "../../types/event";
import { Td } from "./Td";
import { Button } from "../Button";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Props {
  rowData?: ClientType;
  state: "header" | "content";
  headerData?: string[];
}

export const Tr = ({ rowData, state, headerData }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {state == "content" && (
        <tr>
          <Td
            onClick={() =>
              navigate({
                pathname: `/manage-client/${rowData?.id}`,
                search: "?type=show",
              })
            }
          >
            {" "}
            {rowData?.name}
          </Td>
          <Td>{rowData?.email}</Td>
          <Td>{rowData?.phone}</Td>
          <Td>{rowData?.note}</Td>
          <Td>
            <Button onClick={() => console.log(rowData?.id)}>
              <HiDotsVertical />
            </Button>
          </Td>
        </tr>
      )}

      {state == "header" && (
        <tr>
          {headerData?.map((item, key) => (
            <th key={key}>{item}</th>
          ))}
        </tr>
      )}
    </>
  );
};
