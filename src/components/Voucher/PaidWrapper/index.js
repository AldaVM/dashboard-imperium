import { Typography } from "antd";
import { useContext } from "react";
import FormSearchCustomer from "../../Clients/SearchClient";
import ClientCard from "../../Clients/ClientCard";
import { ClientContext } from "../../../context";

const { Title } = Typography;

export default function PaidWrapper() {
  const { client } = useContext(ClientContext);

  return (
    <div>
      <Title>Administrar Pagos</Title>
      <FormSearchCustomer />
      {client.names !== "" && <ClientCard client={client} />}
    </div>
  );
}
