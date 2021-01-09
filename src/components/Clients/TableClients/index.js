import { Table, Space, Button, Modal, Input } from "antd";
import Highlighter from "react-highlight-words";
import {
  DeleteOutlined,
  EditOutlined,
  SelectOutlined,
  SearchOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { ClientContext } from "../../../context";
import { useState, useContext, useRef } from "react";
import { FormUpdateCustomer } from "../../Form";
import ListVouchers from "../../Voucher/VoucherList";

export default function TableClients({ clients }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleVoucherList, setIsVisibleVoucherList] = useState(false);
  const [client, setClient] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { updateClients } = useContext(ClientContext);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  function showModalVoucher() {
    setIsVisibleVoucherList(!isVisibleVoucherList);
  }

  function handleCancelVoucher() {
    setIsVisibleVoucherList(false);
  }

  function handleOkVoucher() {
    setIsVisibleVoucherList(false);
  }

  function showVouchers(currentClient) {
    showModalVoucher();
    setClient(currentClient);
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

  function editClient(currentClient) {
    showModal();
    setClient(currentClient);
  }

  const columns = [
    {
      title: "Nombres",
      dataIndex: "names",
      key: "names",
      fixed: "left",
      width: 180,
    },
    {
      title: "Apellidos",
      dataIndex: "surnames",
      key: "surnames",
      width: 180,
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      width: 120,
      ...getColumnSearchProps("dni"),
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
      width: 120,
    },
    {
      title: "Modalidad",
      dataIndex: "type_modality",
      key: "type_modality",
      render: (type_modality) => {
        return <span>{type_modality ? `${type_modality}` : "Sin Turno"}</span>;
      },
      width: 120,
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
      width: 120,
    },
    {
      title: "Turno Detail",
      dataIndex: "type_timetable",
      key: "type_timetable",
      render: (type_timetable) => (
        <span>{type_timetable ? `${type_timetable}` : "Sin Turno"}</span>
      ),
      width: 120,
    },
    {
      title: "Actions",
      key: "action",
      render: (client) => (
        <Space size="middle">
          <Button
            type="primary"
            info
            onClick={() => showVouchers(client)}
            icon={<SnippetsOutlined />}
          >
            Ver Comprobantes
          </Button>
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
            onClick={() => client.deleteTimetable(client)}
            icon={<SelectOutlined />}
          >
            Retirar de Turno
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
      <Modal
        title={`Cliente: ${client?.names} ${client?.surnames}`}
        visible={isVisibleVoucherList}
        onCancel={handleCancelVoucher}
        onOk={handleOkVoucher}
        footer={null}
      >
        <ListVouchers client={client} />
      </Modal>
      <Table columns={columns} dataSource={clients} scroll={{ x: 0, y: 500 }} />
    </>
  );
}
