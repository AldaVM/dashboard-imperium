import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import FormShift from "../../Form/FormShift";

export default function ActionsShift() {
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
          Crear Turno
        </Button>
        <Button icon={<BarChartOutlined />}>Export Excel</Button>
      </Space>

      <Modal
        title="Nuevo Turno"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <FormShift typeAction="create" />
      </Modal>
    </div>
  );
}
