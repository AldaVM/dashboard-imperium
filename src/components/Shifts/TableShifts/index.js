import { Table, Space, Button, Modal } from "antd";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormShift from "../../Form/FormShift";
import Link from "next/link";

export default function TableShifts({ shifts }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shift, setShift] = useState({});

  function showModal() {
    setIsVisible(!isVisible);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleOk() {
    setIsVisible(false);
  }

  function editShift(currentShift) {
    showModal();
    setShift(currentShift);
  }

  const columns = [
    {
      title: "Turno",
      dataIndex: "class_shift",
      key: "class_shift",
      filters: [
        {
          text: "Mañana",
          value: "mañana",
        },
        {
          text: "Nocturno",
          value: "noche",
        },
      ],
      onFilter: (value, record) => record.class_shift.indexOf(value) === 0,
    },
    {
      title: "Días",
      dataIndex: "intermediate_days",
      key: "intermediate_days",

      filters: [
        {
          text: "L-M-V",
          value: "L-M-V",
        },
        {
          text: "M-J-S",
          value: "M-J-S",
        },
      ],
      onFilter: (value, record) =>
        record.intermediate_days.indexOf(value) === 0,
    },
    {
      title: "Vacantes",
      dataIndex: "vacancies",
      key: "vacancies",
    },
    {
      title: "Inscritos",
      dataIndex: "customerLength",
      key: "customerLength",
    },
    {
      title: "Horario",
      dataIndex: "hour",
      key: "hour",
    },
    {
      title: "Actions",
      key: "action",
      render: (shift) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              editShift(shift);
            }}
          >
            Modificar
          </Button>
          <Link href={`/timetable/${shift._id}`}>
            <Button
              type="primary"
              danger
              onClick={() => console.log(shift)}
              icon={<InfoCircleOutlined />}
            >
              Detail
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Modificar Turno"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <FormShift typeAction="update" initialValues={shift} />
      </Modal>
      <Table columns={columns} dataSource={shifts} />
    </>
  );
}
