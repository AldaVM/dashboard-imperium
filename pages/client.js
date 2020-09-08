import React from "react";
import { ClientProvider } from "../src/providers";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc/privateRouter";
import ClientsWrapper from "../src/components/Clients/ClientsWrapper";

function Client({ clients, countClients }) {
  return (
    <>
      <ClientProvider
        initialValues={{
          clients,
          countClients,
        }}
      >
        <LayoutAdmin>
          <ClientsWrapper />
        </LayoutAdmin>
      </ClientProvider>
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
      countClients: json?.data.count,
    },
  };
}

export default ProtectRoute(Client);
