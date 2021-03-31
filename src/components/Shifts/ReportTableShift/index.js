import { Table } from "antd";

export default function ReportTableShifts({ shifts }) {
  const columns = [
    {
      title: "Turno",
      dataIndex: "class_shift",
      key: "class_shift",
    },
    {
      title: "Días",
      dataIndex: "intermediate_days",
      key: "intermediate_days",
    },
    {
      title: "Vacantes",
      dataIndex: "vacancies",
      key: "vacancies",
      render: (shift) => <span>8</span>,
    },
    {
      title: "Inscritos",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Horario",
      dataIndex: "hour",
      key: "hour",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={shifts} />
    </>
  );
}
