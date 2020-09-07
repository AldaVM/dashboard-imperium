import TableClients from "./TableClients";
import { useState, useContext, useEffect } from "react";
import fetchData from "../../helpers/fetchData";
import { URL_API } from "../../constants";
import { Spin, Typography, notification } from "antd";
import ActionsClient from "./ActionsClient";
import { ClientContext } from "../../context";

const { Title } = Typography;

export default function ClientsWrapper() {
  const { clients, updateClients, countClients } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clientsActions, setClientsActions] = useState(clients);

  async function deleteClient(client) {
    const { _id, timetable } = client;

    let timetableClient = null;
    setIsLoading(true);

    const deleteClients = fetchData(`${URL_API}/customer/${_id}`, {
      method: "DELETE",
      mode: "cors",
    });

    if (timetable) {
      timetableClient = fetchData(
        `${URL_API}/timetable/delete_customer/${timetable._id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: _id,
          }),
        }
      );
    }
    try {
      await Promise.all([timetableClient, deleteClients]).then(() => {
        setIsLoading(false);
        updateClients();
        notification.success({
          message: `Registro Eliminado!`,
          placement: "topRight",
          style: { width: 300 },
        });
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: `Algo anda mal`,
        placement: "topRight",
        style: { width: 300 },
      });
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
      <div className="container">
        <style jsx>{`
          .container {
            position: relative;
            background: rgba(0, 0, 0, 0.05);
            margin-top: 2em;
          }
          .wrapperSpin {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            lef: 0;
            z-index: 100;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.08);
          }
        `}</style>
        {isLoading && (
          <div className="wrapperSpin">
            <Spin size="large" />
          </div>
        )}
        <TableClients clients={clientsActions} />
      </div>
    </>
  );
}
