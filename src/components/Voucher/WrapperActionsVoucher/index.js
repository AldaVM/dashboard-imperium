import { Button, Space, Typography, Spin } from "antd";
import { useState, useContext } from "react";
import { VoucherContext } from "../../../context";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import FormActionsVoucher from "../../Form/ActionVoucher";
import { ContainerActionsVoucher } from "./Styled";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";

const { Title } = Typography;

export default function WrapperActionsVoucher() {
  const [isLoading, setIsLoading] = useState(false);
  const { getVouchers, setFilters } = useContext(VoucherContext);

  async function downloadVoucher() {
    setIsLoading(true);
    await getVouchers(1);
    setFilters({});
    setIsLoading(false);
  }

  return (
    <div>
      <ContainerActionsVoucher>
        <Title level={5}>Filtros:</Title>
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
