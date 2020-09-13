import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import FormShift from "../../Form/FormShift";
import { ContainerActions } from "./Styled";

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
    <ContainerActions>
      <Space>
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
        >
          Crear Turno
        </Button>
        <Button icon={<BarChartOutlined />}>Export Excelll</Button>
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
    </ContainerActions>
  );
}
