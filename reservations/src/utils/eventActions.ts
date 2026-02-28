// utils/useDeleteEvent.tsx
import { useState } from "react";
import type { EventType } from "../types/event";

interface Props {
  e: EventType;
  onChange: (data: any) => void;
  onClose?: () => void;
}

export const useDeleteEvent = ({ e, onChange, onClose }: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => {
    if (!e) return;
    onChange({ type: "delete", data: { id: e.id } });
    setShowAlert(false);
    onClose?.();
  };

  const triggerDelete = () => setShowAlert(true);

  return { showAlert, setShowAlert, handleDelete, triggerDelete };
};
