import { Table, Space, Button, Modal } from "antd";
import { ListItemTable } from "./Styled";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ClientContext } from "../../../context";
import { useState, useContext } from "react";
import { FormUpdateCustomer } from "../../Form";

export default function TableClients({ clients }) {
  const [isVisible, setIsVisible] = useState(false);
  const [client, setClient] = useState({});
  const { updateClients } = useContext(ClientContext);

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
      title: "Creado el",
      dataIndex: "create_at",
      key: "create_at",
      render: (create_at) => {
        const dateCreate = new Date(create_at);
        const day = dateCreate.getDate();
        const month = dateCreate.getMonth();
        const year = dateCreate.getFullYear();

        return <span>{`${day}/${month + 1}/${year}`}</span>;
      },
    },
    {
      title: "Inscrito en Turno",
      dataIndex: "date_timetable",
      key: "date_timetable",
      render: (date_timetable) => {
        const dateCreate = new Date(date_timetable);
        const day = dateCreate.getDate();
        const month = dateCreate.getMonth();
        const year = dateCreate.getFullYear();

        return (
          <span>
            {date_timetable ? `${day}/${month + 1}/${year}` : "00/00/0000"}
          </span>
        );
      },
    },
    {
      title: "Turno",
      dataIndex: "type_timetable",
      key: "type_timetable",
      render: (type_timetable) => (
        <span>{type_timetable ? `${type_timetable}` : "Sin Turno"}</span>
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
        <FormUpdateCustomer
          initialValues={client}
          updatedValues={updateClients}
        />
      </Modal>
      <Table columns={columns} dataSource={clients} />
    </>
  );
}
