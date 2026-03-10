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
