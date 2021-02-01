import { useState, useContext, useEffect } from "react";
import { Spin, Typography, Pagination } from "antd";
import { VoucherContext } from "../../../context";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";
import TablePaids from "../TableVoucher";
import { columnsGeneric } from "../TableVoucher/columns";
import { addElementKey } from "../../../helpers/parseValues";

const { Title } = Typography;

export default function VouchersWrapper() {
  const { vouchers, countVouchers, getVouchers } = useContext(VoucherContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = async (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    await getVouchers(page);
    setIsLoading(false);
  };

  const columns = [
    ...columnsGeneric,
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer",
      width: 100,
      render: (customer) => {
        return <>{`${customer?.names} ${customer?.surnames}`}</>;
      },
    },
  ];

  return (
    <>
      <Title>Comprobantes</Title>
      <Title level={5}>
        Comprobantes registrados: {countVouchers ? countVouchers : 0}
      </Title>
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
