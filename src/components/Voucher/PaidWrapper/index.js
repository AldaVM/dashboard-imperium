import { Typography, Tag, Space, Button } from "antd";
import { MoneyCollectFilled } from "@ant-design/icons";
import { useContext, useState } from "react";
import { VoucherProvider } from "../../../providers";
import TablePaids from "../TableVoucher";
import FormVoucher from "../../Form/FormVoucher";
import FormSearchCustomer from "../../Clients/SearchClient";
import ClientCard from "../../Clients/ClientCard";
import { ClientContext } from "../../../context";
import PaidCard from "../PaidCard";
import Modal from "antd/lib/modal/Modal";

const { Title } = Typography;

export default function PaidWrapper() {
  const { client } = useContext(ClientContext);
  const [isVisible, setIsVisible] = useState(false);

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

  function showModal() {
    console.log(client);
    setIsVisible(!isVisible);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleOk() {
    setIsVisible(false);
  }

  return (
    <div>
      <Title>Administrar Pagos</Title>
      <Space direction="horizontal" align="start">
        <FormSearchCustomer />
        {client.dni.length == 8 && (
          <Button
            type="primary"
            className="login-form-button"
            icon={<MoneyCollectFilled />}
            onClick={showModal}
            block
          >
            Registrar Voucher
          </Button>
        )}
      </Space>
      <br />
      <Modal
        title="Nuevo Cliente"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <VoucherProvider
          initialValues={{
            voucher: {},
          }}
        >
          <FormVoucher />
        </VoucherProvider>
      </Modal>
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
