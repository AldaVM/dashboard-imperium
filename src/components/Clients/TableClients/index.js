import { Table, Space, Button, Modal } from "antd";
import { ListItemTable } from "./Styled";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FormUpdateCustomer } from "../../Form";

export default function TableClients({ clients }) {
  const [isVisible, setIsVisible] = useState(false);
  const [client, setClient] = useState({});

  function showModal() {
    setIsVisible(!isVisible);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleOk() {
    setIsVisible(false);
  }

  function editClient(currentClient) {
    showModal();
    setClient(currentClient);
  }

  const columns = [
    {
      title: "Nombres",
      dataIndex: "names",
      key: "names",
    },
    {
      title: "Apellidos",
      dataIndex: "surnames",
      key: "surnames",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Turno",
      dataIndex: "timetable",
      key: "timetable",
      render: (timetable) => (
        <ListItemTable>
          <li>{timetable?.class_shift}</li>
          <li>{timetable?.intermediate_days}</li>
          <li>{timetable?.hour}</li>
        </ListItemTable>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (client) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              editClient(client);
            }}
          >
            Modificar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => client.delete(client)}
            icon={<DeleteOutlined />}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Actualizar Cliente"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <FormUpdateCustomer initialValues={client} />
      </Modal>
      <Table columns={columns} dataSource={clients} />
    </>
  );
}
