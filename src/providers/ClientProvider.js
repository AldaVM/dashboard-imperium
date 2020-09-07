import { useState } from "react";
import { ClientContext } from "../context";
import fetchData from "../helpers/fetchData";
import { URL_API } from "../constants";

export default function ClientProvider({ children, initialValues }) {
  const [clients, setClients] = useState(initialValues.clients);
  const [countClients, setCountClients] = useState(initialValues.countClients);

  async function updateClients() {
    try {
      const response = await fetchData(`${URL_API}/customer`, {
        method: "GET",
        mode: "cors",
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        setClients(response.data.records);
        setCountClients(response.data.count ? response.data.count : 0);
      }
    } catch (error) {
      setClients([]);
      console.log(error);
    }
  }

  return (
    <ClientContext.Provider value={{ clients, countClients, updateClients }}>
      {children}
    </ClientContext.Provider>
  );
}
