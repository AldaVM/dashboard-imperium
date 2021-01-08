import { useState, useContext, useEffect } from "react";
import { Spin, Typography } from "antd";
import { ClientContext } from "../../../context";
import serviceFetch from "../../../helpers/closureFetch";
import allFetch from "../../../helpers/allFetch";
import validateResponse from "../../../helpers/validationsReponse";
import ActionsClient from "../ActionsClient";
import TableClients from "../TableClients";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";

const { Title } = Typography;

export default function ClientsWrapper() {
  const { clients, updateClients, countClients } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clientsActions, setClientsActions] = useState(clients);

  async function deleteClientTimetable(client) {
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
        return serviceFetch(`timetable/delete_customer/${turn._id}`).create({
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
        setIsLoading(false);
        updateClients();
      } catch (error) {
        setIsLoading(false);
        validateResponse(error.status);
      }
    } else {
      validateResponse(500, "El cliente selecionado no tiene turno registrado");
    }
  }

  async function deleteClient(client) {
    const { _id, timetable } = client;

    let deleteCustomerTimetable = [];
    setIsLoading(true);

    const { deleteData } = serviceFetch(`customer/${_id}`);
    const deleteCustomer = deleteData();

    if (timetable) {
      deleteCustomerTimetable = timetable.map((turn) => {
        return serviceFetch(`timetable/delete_customer/${turn._id}`).create({
          customer: _id,
        });
      });
    }

    try {
      const [resCustomer, resTimetable] = await allFetch([
        deleteCustomer,
        ...deleteCustomerTimetable,
      ]);

      validateResponse(resCustomer.status, resCustomer.message);
      if (resTimetable) {
        validateResponse(resTimetable.status, resTimetable.message);
      }
      setIsLoading(false);
      updateClients();
    } catch (error) {
      setIsLoading(false);
      validateResponse(error.status);
    }
  }

  useEffect(() => {
    setClientsActions(
      clients.reduce((accumulator, currentValue) => {
        accumulator.push({
          ...currentValue,
          key: currentValue._id,
          delete: deleteClient,
          deleteTimetable: deleteClientTimetable,
        });
        return accumulator;
      }, [])
    );
  }, [clients]);

  return (
    <>
      <Title>Clientes</Title>
      <Title level={5}>
        Clientes registrados: {countClients ? countClients : 0}
      </Title>
      <ActionsClient />
      <ContainerSpin>
        {isLoading && (
          <WrapperSpin>
            <Spin size="large" />
          </WrapperSpin>
        )}
      </ContainerSpin>
      <TableClients clients={clientsActions} />
    </>
  );
}
