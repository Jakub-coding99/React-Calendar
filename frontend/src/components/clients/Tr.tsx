import type { ClientType } from "../../types/event";
import { Td } from "./Td";
import { Button } from "../Button";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { useState } from "react";

interface Props {
  rowData?: ClientType;
  state: "header" | "content";
  headerData?: string[];
  handleClientAction?: () => void;
}

export const Tr = ({
  rowData,
  state,
  headerData,
  handleClientAction,
}: Props) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  return (
    <>
      {state == "content" && (
        <tr className="m-5 p-5">
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
            <Button onClick={() => setOpenDropdown(true)}>
              <div style={{ position: "relative" }}>
                <HiDotsVertical />

                <div>
                  {openDropdown && (
                    <Dropdown
                      close={() => closeDropdown()}
                      handleClientAction={handleClientAction}
                      type="clientAction"
                      clientId={rowData?.id}
                    />
                  )}
                </div>
              </div>
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
