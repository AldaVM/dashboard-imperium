import { useEffect, useContext } from "react";
import { Form, Button, Spin, Select } from "antd";
import { tailLayoutForm } from "../complements";
import { ShiftContext } from "../../../context";

export default function FormTimetableReport({
  isLoading,
  initialValues = {},
}) {
  const [form] = Form.useForm();

  const { getTimetableByFilters } = useContext(ShiftContext);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...initialValues,
    });
  }, [initialValues]);

  const onFinish = (values) => {
    console.log(values)
    getTimetableByFilters(values);
  };

  return (
    <Form
      form={form}
      layout="inline"
      name="form_actions_vouchers"
      name="form_shift_report"
      style={{ margin: "2em 0" }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Asistencia"
        name="intermediate_days"
        rules={[
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          <Select.Option value="L-M-V">Lunes-Miércoles-Viernes</Select.Option>
          <Select.Option value="M-J-S">Martes-Jueves-Sábado</Select.Option>
          <Select.Option value="all_days">Diario</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Turno"
        name="class_shift"
        rules={[
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Select style={{ width: 130 }}>
          <Select.Option value="mañana">Mañana</Select.Option>
          <Select.Option value="noche">Nocturno</Select.Option>
          <Select.Option value="open-box">Tarde - OpenBox</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayoutForm}>
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>

      {isLoading && <Spin />}
    </Form>
  );
}
