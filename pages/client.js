import React from "react";
import { ClientProvider } from "../src/providers";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc/privateRouter";
import ClientsWrapper from "../src/components/Clients/ClientsWrapper";
import { addElementKey } from "../src/helpers/parseValues";
import { URL_API } from "../src/constants";

function Client({ clients, countClients }) {
  return (
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
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${URL_API}/customer`);
    const json = await res.json();

    return {
      props: {
        clients: addElementKey(json?.data.records),
        countClients: json?.data.count,
      },
    };
  } catch (error) {
    return {
      props: {
        clients: [],
        countClients: 0,
      },
    };
  }
}

export default ProtectRoute(Client);
