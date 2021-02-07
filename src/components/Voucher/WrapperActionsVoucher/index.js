import { Button, Space, Spin } from "antd";
import { useState, useContext } from "react";
import { VoucherContext } from "../../../context";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import FormActionsVoucher from "../../Form/ActionVoucher";
import { ContainerActionsVoucher } from "./Styled";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";

export default function WrapperActionsVoucher() {
  const [isLoading, setIsLoading] = useState(false);
  const { getVouchers, setFilters } = useContext(VoucherContext);

  async function downloadVoucher() {
    setIsLoading(true);
    await getVouchers(1);
    setFilters({
      validity_date: null,
      status_paid: null,
      expire_date: null,
    });
    setIsLoading(false);
  }

  return (
    <div>
      <ContainerActionsVoucher>
        <span>Filtros:</span>
        <Space>
          <FormActionsVoucher />
          <Button
            type="primary"
            shape="round"
            icon={<DeleteFilled />}
            onClick={downloadVoucher}
          >
            Quitar Filtros
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            onClick={downloadVoucher}
          >
            XLS
          </Button>
        </Space>
      </ContainerActionsVoucher>
      <ContainerSpin>
        {isLoading && (
          <WrapperSpin>
            <Spin size="large" />
          </WrapperSpin>
        )}
      </ContainerSpin>
    </div>
  );
}
