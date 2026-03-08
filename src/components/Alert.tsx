import React from "react";
import { IoIosWarning } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  confirm: () => void;
  close: () => void;
}

export const Alert = ({ children, confirm, close }: Props) => {
  return (
    <>
      <div className="alert-wrapper p-3 ">
        <div className="alert-window border border-secondary">
          <div className="warning-alert">
            <IoIosWarning size={65} />
          </div>
          <h4>{children}</h4>
          <p>Všechna data budou nenavrátně smazána</p>

          <div className="d-flex justify-content-between w-50 gap-8">
            <button onClick={close}>Zrušit</button>
            <button className="confirm-alert" onClick={confirm}>
              Ano
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
