import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientAction } from "../types/event";

interface Props {
  close: () => void;
  handleClientAction?: (data?: ClientAction) => void;
  type: "clientAction" | "clientsHeader";
  clientId?: number;
}

export const Dropdown = ({
  close,
  handleClientAction,
  type,
  clientId,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        close();
    };
    document.addEventListener("mousedown", callback);
    return () => document.removeEventListener("mousedown", callback);
  }, [close]);

  const editUser = () => {
    if (!clientId) return;
    navigate(`/manage-client/${clientId}?type=edit`);
  };

  return (
    <>
      {type == "clientAction" && (
        <div
          className="dropdown-wrapper-clients-action"
          style={{
            position: "absolute",
          }}
          ref={dropdownRef}
        >
          <div className="dropdown-content d-flex flex-row">
            <div className="m-2" onClick={() => editUser()}>
              Upravit
            </div>
            <p
              className="m-2"
              onClick={() => {
                if (clientId !== undefined) {
                  handleClientAction?.({
                    type: "delete",
                    data: {
                      id: clientId,
                    },
                  });
                }
              }}
            >
              Smazat
            </p>
          </div>
        </div>
      )}

      {type == "clientsHeader" && (
        <div
          className="dropdown-wrapper-clients-header"
          style={{
            position: "absolute",
          }}
          ref={dropdownRef}
        >
          <div className="dropdown-content">
            <p>test</p>
            <p>test</p>
          </div>
        </div>
      )}
    </>
  );
};
