import { useState } from "react";
import { ClientContext } from "../context";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

export default function ClientProvider({ children, initialValues }) {
  const [clients, setClients] = useState(initialValues.clients);
  const [countClients, setCountClients] = useState(initialValues.countClients);

  async function updateClients() {
    try {
      const { get } = serviceFetch("customer");
      const response = await get();

      validateResponse(response.status, "List Clients");
      setClients(response.data.records);
      setCountClients(response.data.count ? response.data.count : 0);
    } catch (error) {
      setClients([]);
      setCountClients(0);
    }
  }

  return (
    <ClientContext.Provider value={{ clients, countClients, updateClients }}>
      {children}
    </ClientContext.Provider>
  );
}
