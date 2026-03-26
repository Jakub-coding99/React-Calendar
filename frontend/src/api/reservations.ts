import type { EventType } from "../types/event";

const apiURL = "http://localhost:8000/router/";

export const fetchEvents = async () => {
  try {
    const res = await fetch(`${apiURL}load-events`);
    if (!res.ok) throw new Error(`Chyba načítání událostí: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchClients = async () => {
  try {
    const res = await fetch(`${apiURL}get-clients`);
    if (!res.ok) throw new Error(`Chyba načítání klientů: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClient = async (id: number) => {
  try {
    const res = await fetch(`${apiURL}get-client/${id}`);
    if (!res.ok) throw new Error(`Chyba načítání klienta: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createEvent = async (data: EventType) => {
  try {
    const res = await fetch(`${apiURL}create-event`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    if (!res.ok)
      throw new Error(
        json?.message || `Chyba vytváření události: ${res.status}`,
      );
    return { status: json, ok: res.ok, data: json.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editEvent = async (data: EventType) => {
  try {
    const res = await fetch(`${apiURL}update-event/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      throw new Error(json?.message || `Chyba editace události: ${res.status}`);
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const res = await fetch(`${apiURL}delete-event/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) return null;
    if (!res.ok) throw new Error(`Chyba mazání události: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
