import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc/privateRouter";
import { Typography } from "antd";
import ClientsWrapper from "../src/components/Clients";

const { Title } = Typography;

function Client({ clients }) {
  return (
    <>
      <LayoutAdmin>
        <Title>Clientes</Title>
        <ClientsWrapper clients={clients} />
      </LayoutAdmin>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/v1/api/customer/");
  const json = await res.json();

  return {
    props: {
      clients:
        json.status === 200
          ? json?.data.records.reduce((clients, currentClient) => {
              clients.push({ ...currentClient, key: currentClient._id });
              return clients;
            }, [])
          : [],
    },
  };
}

export default ProtectRoute(Client);
