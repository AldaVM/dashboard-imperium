import { useState, useContext } from "react";
import { Spin, Typography, Pagination, Space, Button, Modal } from "antd";
import FormVoucher from "../../Form/FormVoucher";
import { EditOutlined, SelectOutlined } from "@ant-design/icons";
import { VoucherContext, ClientContext } from "../../../context";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";
import TablePaids from "../TableVoucher";
import WrapperActionsVoucher from "../WrapperActionsVoucher";
import { columnsGeneric } from "../TableVoucher/columns";
import { addElementKey } from "../../../helpers/parseValues";

const { Title } = Typography;

export default function VouchersWrapper() {
  const {
    vouchers,
    countVouchers,
    getVouchers,
    isFilter,
    filters,
    getVouchersByFilters,
  } = useContext(VoucherContext);
  const { removeClientFromShift } = useContext(ClientContext);
  const [isVisible, setIsVisible] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  function updateVoucher(data) {
    setCurrentVoucher(data);
    showModal();
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

  const deleteClientFromShift = async (voucher) => {
    const { customer } = voucher;

    if (customer?.timetable) {
      await removeClientFromShift(customer);

      if (isFilter) {
        await getVouchersByFilters(currentPage, filters);
      } else {
        await getVouchers(currentPage);
      }
    }
  };

  const onChange = async (page) => {
    setIsLoading(true);
    setCurrentPage(page);

    if (isFilter) {
      await getVouchersByFilters(page, filters);
    } else {
      await getVouchers(page);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer_name",
      fixed: true,
      width: 100,
      render: (customer) => {
        return <>{`${customer?.names} ${customer?.surnames}`}</>;
      },
    },
    {
      title: "DNI",
      dataIndex: "customer",
      key: "customer_dni",
      width: 100,
      render: (customer) => {
        return <>{`${customer?.dni}`}</>;
      },
    },
    ...columnsGeneric,
    {
      title: "Actions",
      key: "action",
      width: 500,
      render: (voucher) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              updateVoucher(voucher);
            }}
          >
            Modificar
          </Button>
          {voucher?.customer?.timetable.length > 0 && (
            <Button
              type="primary"
              danger
              onClick={() => deleteClientFromShift(voucher)}
              icon={<SelectOutlined />}
            >
              Retirar de Turno
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title>Comprobantes</Title>
      <Title level={5}>
        Comprobantes registrados: {countVouchers ? countVouchers : 0}
      </Title>
      <WrapperActionsVoucher />
      <Modal
        title="Registar Comprobante"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <FormVoucher initialValues={currentVoucher} isUpdated={true} />
      </Modal>
      <TablePaids
        paids={addElementKey(vouchers)}
        columns={columns}
        isPagination={false}
      />
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={countVouchers}
      />
      <ContainerSpin>
        {isLoading && (
          <WrapperSpin>
            <Spin size="large" />
          </WrapperSpin>
        )}
      </ContainerSpin>
    </>
  );
}
