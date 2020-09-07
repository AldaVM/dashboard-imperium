import { Table, Space, Button, Form, Modal } from "antd";
import { ListItemTable } from "./Styled";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FormUpdateCustomer } from "../../Form";

export default function TableClients({ clients }) {
  const [isVisible, setIsVisible] = useState(false);
  const [client, setClient] = useState({});
  const [form] = Form.useForm();

  function showModal() {
    form.resetFields();
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
    console.log(currentClient);
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
      title: "Action",
      key: "action",
      render: (client) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              editClient(client);
              setClient(client);
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
      >
        <FormUpdateCustomer initialValues={client} form={form} />
      </Modal>
      <Table columns={columns} dataSource={clients} />
    </>
  );
}
