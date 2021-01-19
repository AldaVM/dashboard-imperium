import { Form, Input, Button, Spin, Select, InputNumber } from "antd";
import { useState, useContext } from "react";
import { ClientContext, VoucherContext } from "../../../context";
import { layoutForm, tailLayoutForm } from "../complements";

export default function FormVoucher() {
  const [isLoading, setIsLoading] = useState(false);
  const { createVoucher } = useContext(VoucherContext);
  const { client, getClientByDNI } = useContext(ClientContext);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await createVoucher(client._id, values);
      setIsLoading(false);
      getClientByDNI(client.dni);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        {...layoutForm}
        name="form_voucher"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Monto a pagar"
          name="rate"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <InputNumber min={1} placeholder="Ingresa la tarifa del paquete" />
        </Form.Item>
        <Form.Item
          label="Monto pagado"
          name="amount_paid"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <InputNumber min={1} placeholder="Ingresa el monto que pagará el cliente" />
        </Form.Item>
        <Form.Item label="Fecha de inicio" name="date_init">
          <Input
            placeholder="Ingresa la fecha en la que inicia el periodo de cliente"
            type="date"
            rules={[
              {
                required: true,
                message: "Este campo es requerido",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Fecha de expirtación" name="date_expiration">
          <Input
            placeholder="Ingresa la fecha en la que expira el periodo de cliente"
            type="date"
            rules={[
              {
                required: true,
                message: "Este campo es requerido",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Rango de hora"
          name="hours_turn"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Ejemplo: 07am-08am" />
        </Form.Item>
        <Form.Item
          label="Detalle del turno"
          name="turn_detail"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="HORARIO-0AM-0AM-DIARIO" />
        </Form.Item>
        <Form.Item
          label="Modalidad"
          name="type_modality"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Select>
            <Select.Option value="MENSUAL">Mensual</Select.Option>
            <Select.Option value="TRIMESTRAL">Trimestral</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayoutForm}>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </>
  );
}
