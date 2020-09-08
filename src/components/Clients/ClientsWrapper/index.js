import { useState, useContext, useEffect } from "react";
import { Spin, Typography } from "antd";
import { ClientContext } from "../../../context";
import serviceFetch from "../../../helpers/closureFetch";
import allFetch from "../../../helpers/allFetch";
import validateResponse from "../../../helpers/validationsReponse";
import ActionsClient from "../ActionsClient";
import TableClients from "../TableClients";
import { ContainerClients, WrapperSpin } from "./Styled";

const { Title } = Typography;

export default function ClientsWrapper() {
  const { clients, updateClients, countClients } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clientsActions, setClientsActions] = useState(clients);

  async function deleteClient(client) {
    const { _id, timetable } = client;

    let deleteCustomerTimetable = null;
    setIsLoading(true);

    const { deleteData } = serviceFetch(`customer/${_id}`);
    const deleteCustomer = deleteData();

    if (timetable) {
      const { create } = serviceFetch(
        `timetable/delete_customer/${timetable._id}`
      );
      deleteCustomerTimetable = create({
        customer: _id,
      });
    }

    try {
      const [resCustomer, resTimetable] = await allFetch([
        deleteCustomer,
        deleteCustomerTimetable,
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
      <ContainerClients>
        {isLoading && (
          <WrapperSpin>
            <Spin size="large" />
          </WrapperSpin>
        )}
      </ContainerClients>
      <TableClients clients={clientsActions} />
    </>
  );
}
