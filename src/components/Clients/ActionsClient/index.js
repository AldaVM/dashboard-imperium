import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import { FormCustomer } from "../../Form/";

export default function ActionsClient() {
  const [isVisible, setIsVisible] = useState(false);

  function showModal() {
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
      <Space>
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
        >
          Crear Cliente
        </Button>
        <Button icon={<BarChartOutlined />}>Export Excel</Button>
      </Space>

      <Modal
        title="Nuevo Cliente"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <FormCustomer />
      </Modal>
    </div>
  );
}
