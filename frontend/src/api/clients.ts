import type { NewClient } from "../types/event";

const apiURL = "http://localhost:8000/router/";

export const fetchClients = async () => {
  try {
    const res = await fetch(`${apiURL}get-clients`);
    if (!res.ok) throw new Error(`Failed to load clients: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClient = async (id: number) => {
  try {
    const res = await fetch(`${apiURL}get-client/${id}`);
    if (!res.ok) throw new Error(`Failed to  load client: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClient = async (id: number) => {
  try {
    const res = await fetch(`${apiURL}delete-client/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) return null;
    if (!res.ok) throw new Error(`Failed to  delete client: ${res.status}`);
    console.log(`mažu klienta: ${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createClient = async (client: NewClient) => {
  try {
    const res = await fetch(`${apiURL}create-client/`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify(client),
    });
    if (!res.ok) throw new Error(`Failed to  create client: ${res.status}`);
    const json = await res.json();
    return { status: json, ok: res.ok, data: json.data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
