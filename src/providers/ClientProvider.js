import { useState } from "react";
import { DEFAULT_CLIENT_404 } from "../constants";
import { ClientContext } from "../context";
import serviceFetch from "../helpers/closureFetch";
import allFetch from "../helpers/allFetch";
import validateResponse from "../helpers/validationsReponse";

export default function ClientProvider({ children, initialValues }) {
  const [clients, setClients] = useState(initialValues.clients);
  const [countClients, setCountClients] = useState(initialValues.countClients);
  const [client, setClient] = useState(initialValues.client);

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

  async function getClientByFilters(filters) {
    try {
      const { create } = serviceFetch(`customer/find_property`);
      const response = await create({
        items: {
          ...filters,
        },
      });

      validateResponse(response.status, "Cliente encontrado");
      if (response?.data.length > 0) {
        setClient(response?.data[0]);
      } else {
        setClient(DEFAULT_CLIENT_404);
      }
    } catch (error) {
      console.error(error);
      validateResponse(error.status, "Error to request");
      setClient(DEFAULT_CLIENT_404);
    }
  }

  async function getClientByDNI(dni) {
    try {
      const { create } = serviceFetch(`customer/find_property`);
      const response = await create({
        items: {
          dni,
        },
      });

      validateResponse(response.status, "Cliente encontrado");
      if (response?.data.length > 0) {
        setClient(response?.data[0]);
      } else {
        setClient(DEFAULT_CLIENT_404);
      }
    } catch (error) {
      console.error(error);
      validateResponse(error.status, "Error to request");
      setClient(DEFAULT_CLIENT_404);
    }
  }

  async function removeClientFromShift(client) {
    const { _id, timetable } = client;

    if (timetable) {
      const { update } = serviceFetch(`customer/${_id}`);
      const updateClient = update({
        timetable: [],
        date_timetable: 0,
        type_timetable: "",
        type_modality: "",
      });

      const deleteCustomerTimetable = timetable.map((turn) => {
        return serviceFetch(`timetable/delete_customer/${turn}`).create({
          customer: _id,
        });
      });

      try {
        const [resCustomer, resTimetable] = await allFetch([
          ...deleteCustomerTimetable,
          updateClient,
        ]);

        validateResponse(resCustomer.status, resCustomer.message);
        if (resTimetable) {
          validateResponse(resTimetable.status, resTimetable.message);
        }
      } catch (error) {
        validateResponse(error.status);
      }
    } else {
      validateResponse(500, "El cliente selecionado no tiene turno registrado");
    }
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        client,
        countClients,
        updateClients,
        getClientByDNI,
        getClientByFilters,
        removeClientFromShift,
        setClient
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
