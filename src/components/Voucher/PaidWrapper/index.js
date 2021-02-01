import { Typography, Tag, Space, Button } from "antd";
import {
  MoneyCollectFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { VoucherProvider } from "../../../providers";
import TablePaids from "../TableVoucher";
import { columnsGeneric } from "../TableVoucher/columns";
import FormVoucher from "../../Form/FormVoucher";
import FormSearchCustomer from "../../Clients/SearchClient";
import ClientCard from "../../Clients/ClientCard";
import { ClientContext } from "../../../context";
import PaidCard from "../PaidCard";
import Modal from "antd/lib/modal/Modal";
import { addElementKey } from "../../../helpers/parseValues";

const { Title } = Typography;

export default function PaidWrapper() {
  const { client } = useContext(ClientContext);
  const [currentVoucher, setCurrentVoucher] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  function UpdateVoucher(data) {
    setCurrentVoucher(data);
    showModalUpdate();
  }

  const columns = [
    ...columnsGeneric,
    {
      title: "Actions",
      key: "action",
      width: 100,
      render: (data) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              UpdateVoucher(data);
            }}
          >
            Modificar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => console.log("hola")}
            icon={<DeleteOutlined />}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  function showModal() {
    setIsVisible(!isVisible);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleOk() {
    setIsVisible(false);
  }

  function showModalUpdate() {
    setIsVisibleUpdate(!isVisibleUpdate);
  }

  function handleCancelUpdate() {
    setIsVisibleUpdate(false);
  }

  function handleOkUpdate() {
    setIsVisibleUpdate(false);
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
        title="Registar Comprobante"
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
      <Modal
        title="Modificar Comprobante"
        visible={isVisibleUpdate}
        onCancel={handleCancelUpdate}
        onOk={handleOkUpdate}
        footer={null}
      >
        <VoucherProvider
          initialValues={{
            voucher: {},
          }}
        >
          <FormVoucher initialValues={currentVoucher} isUpdated={true} />
        </VoucherProvider>
      </Modal>
      <Space direction="horizontal" align="start">
        {client.names !== "" && <ClientCard client={client} />}
        {client.vouchers && client?.vouchers.length > 0 && (
          <PaidCard client={client} />
        )}
      </Space>

      <TablePaids paids={addElementKey(client.vouchers)} columns={columns} />
    </div>
  );
}
