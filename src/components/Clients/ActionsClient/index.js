import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import { FormCustomer } from "../../Form/";

export default function ActionsClient() {
  const [isVisible, setIsVisible] = useState(false);

  async function downloadClients() {
    fetch(
      "https://app-imperiumcross.herokuapp.com/v1/api/customer/download_xlsx",
      {
        mode: "cors",
        headers: {
          "Content-Disposition": `attachment; filename="clients.xlsx"`,
          "Transfer-Encoding": "chunked",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      })
      .catch((error) => console.log(error));
  }

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
    <>
      <Space>
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
        >
          Crear Cliente
        </Button>
        <Button icon={<BarChartOutlined />} onClick={downloadClients}>
          Export Excel
        </Button>
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
    </>
  );
}
