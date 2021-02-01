import { Form, Button, Spin, InputNumber, Select } from "antd";
import { VoucherContext } from "../../../context";
import { tailLayoutForm } from "../complements";
import { useState, useContext } from "react";

function FormActionsVoucher() {
  const { getVouchersByStatusPaid, getVouchers } = useContext(VoucherContext);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    if (values.status_paid === "all_vouchers") {
      await getVouchers(1);
    } else {
      await getVouchersByStatusPaid(values.status_paid, 1);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form
        layout="inline"
        name="form_actions_vouchers"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Estado del Pago:" name="status_paid">
          <Select style={{ width: 130 }}>
            <Select.Option value="completed">Completados</Select.Option>
            <Select.Option value="pending">Pendientes</Select.Option>
            <Select.Option value="all_vouchers">Todos</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayoutForm}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: -15 }}>
            Aplicar
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </>
  );
}

export default FormActionsVoucher;
