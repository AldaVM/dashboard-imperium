import { Button, Space, Typography } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import FormActionsVoucher from "../../Form/ActionVoucher";
import { ContainerActionsVoucher } from "./Styled";

const { Title } = Typography;

export default function WrapperActionsVoucher() {
  const [isVisible, setIsVisible] = useState(false);

  async function downloadVoucher() {
    console.log("Hola");
  }

  return (
    <ContainerActionsVoucher>
      <Title level={5}>Filtros:</Title>
      <Space>
        <FormActionsVoucher />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ marginLeft: 20 }}
        >
          Próximos a vencer
        </Button>
        <Button icon={<BarChartOutlined />} onClick={downloadVoucher}>
          Export Excel
        </Button>
      </Space>
    </ContainerActionsVoucher>
  );
}
