import { Typography, Tag, Space } from "antd";
import { useContext } from "react";
import TablePaids from "../TableVoucher";
import FormSearchCustomer from "../../Clients/SearchClient";
import ClientCard from "../../Clients/ClientCard";
import { ClientContext } from "../../../context";
import PaidCard from "../PaidCard";

const { Title } = Typography;

export default function PaidWrapper() {
  const { client } = useContext(ClientContext);

  const columns = [
    {
      title: "Monto a pagar",
      dataIndex: "rate",
      key: "rate",
      width: 60,
    },
    {
      title: "Monto pagado",
      dataIndex: "amount_paid",
      key: "amount_paid",
      width: 60,
    },
    {
      title: "Monto pendiente",
      dataIndex: "residue",
      key: "residue",
      width: 60,
    },
    {
      title: "Estado del pago",
      dataIndex: "status_paid",
      key: "status_paid",
      width: 60,
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
      title: "Turno",
      dataIndex: "turn_detail",
      key: "turn_detail",
      width: 100,
    },

    {
      title: "Fecha de creación",
      dataIndex: "date_init",
      key: "date_init",
      width: 100,
    },
    {
      title: "Fecha de expiración",
      dataIndex: "date_expiration",
      key: "date_expiration",
      width: 100,
    },
  ];

  return (
    <div>
      <Title>Administrar Pagos</Title>
      <FormSearchCustomer />
      <Space direction="horizontal" align="start">
        {client.names !== "" && <ClientCard client={client} />}
        {client.vouchers && client?.vouchers.length > 0 && (
          <PaidCard client={client} />
        )}
      </Space>

      <TablePaids paids={client.vouchers} columns={columns} />
    </div>
  );
}
