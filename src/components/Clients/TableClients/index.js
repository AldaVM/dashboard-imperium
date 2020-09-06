import { Table, Space, Button } from "antd";
import { ListItemTable } from "./Styled";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
        <Button icon={<EditOutlined />}>Modificar</Button>
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

export default function TableClients({ clients }) {
  return (
    <>
      <Table columns={columns} dataSource={clients} />
    </>
  );
}
