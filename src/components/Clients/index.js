import TableClients from "./TableClients";
import { useState } from "react";
import fetchData from "../../helpers/fetchData";
import { URL_API } from "../../constants";
import { Spin } from "antd";
import ActionsClient from "./ActionsClient";

export default function ClientsWrapper({ clients }) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteClient(client) {
    const { _id, timetable } = client;

    let timetableClient = null;
    setIsLoading(true);

    const customer = fetchData(`${URL_API}/customer/${_id}`, {
      method: "DELETE",
      mode: "cors",
      "Content-Type": "application/json",
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
      await Promise.all([timetableClient, customer]).then((values) => {
        setIsLoading(false);
        setTimeout(function () {
          return window.location.reload(false);
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const clientsActions = clients.reduce((accumulator, currentValue) => {
    accumulator.push({
      ...currentValue,
      delete: deleteClient,
    });
    return accumulator;
  }, []);

  return (
    <>
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
