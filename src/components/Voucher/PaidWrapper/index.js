import { Typography, Tag } from "antd";
import { useContext } from "react";
import TablePaids from "../TableVoucher";
import FormSearchCustomer from "../../Clients/SearchClient";
import ClientCard from "../../Clients/ClientCard";
import { ClientContext } from "../../../context";

const { Title } = Typography;

export default function PaidWrapper() {
  const { client } = useContext(ClientContext);

  const columns = [
    {
      title: "Monto a pagar",
      dataIndex: "rate",
      key: "rate",
      width: 120,
    },
    {
      title: "Monto pagado",
      dataIndex: "amount_paid",
      key: "amount_paid",
      width: 120,
    },
    {
      title: "Monto pendiente",
      dataIndex: "residue",
      key: "residue",
      width: 120,
    },
    {
      title: "Estado del pago",
      dataIndex: "status_paid",
      key: "status_paid",
      width: 120,
      render: (status_paid) => {
        let color = status_paid === "pending" ? "tomato" : "green";

        return (
          <>
            <Tag color={color} key={status_paid}>
              {status_paid.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Fecha de creación",
      dataIndex: "date_init",
      key: "date_init",
      width: 120,
    },
    {
      title: "Fecha de expiración",
      dataIndex: "date_expiration",
      key: "date_expiration",
      width: 120,
    },
  ];

  return (
    <div>
      <Title>Administrar Pagos</Title>
      <FormSearchCustomer />
      {client.names !== "" && <ClientCard client={client} />}
      <TablePaids paids={client.vouchers} columns={columns} />
    </div>
  );
}
