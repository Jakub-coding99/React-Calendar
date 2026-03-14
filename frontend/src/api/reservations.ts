import type { EventType } from "../types/event";

const apiURL = "http://localhost:8000/router/";

export const fetchEvents = async () => {
  const res = await fetch(`${apiURL}load-events`);
  return res.json();
};

export const createEvent = async (data: EventType) => {
  const res = await fetch(`${apiURL}create-event`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json; // API může vrátit ID nebo potvrzení
};

export const editEvent = async (data: EventType) => {
  const res = await fetch(`${apiURL}update-event/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
    },
    method: "PATCH",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json; // API může vrátit ID nebo potvrzení
};

export const deleteEvent = async (id: number) => {
  const res = await fetch(`${apiURL}delete-event/${id}`, {
    method: "DELETE",
  });

  if (res.status === 204) return null;
  return res.json();
};
