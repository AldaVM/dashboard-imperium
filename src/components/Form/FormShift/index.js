import { Form, Input, Button, Spin, InputNumber, Select } from "antd";
import { layoutForm, tailLayoutForm } from "../complements";
import withFormShift from "../../../hoc/withFormShift";
import { useEffect } from "react";

function FormShift({
  isLoading,
  createShift,
  updateShift,
  typeAction = "create",
  initialValues = {},
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...initialValues,
    });
  }, [initialValues]);

  const onFinish = (values) => {
    if (typeAction === "create") {
      createShift(values);
    }

    if (typeAction === "update") {
      updateShift(values, initialValues._id);
    }
  };

  return (
    <>
      <Form
        form={form}
        {...layoutForm}
        name="form_shift"
        onFinish={onFinish}
        autoComplete="off"
      >
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
          <Select>
            <Select.Option value="mañana">Mañana</Select.Option>
            <Select.Option value="noche">Nocturno</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Días"
          name="intermediate_days"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Select>
            <Select.Option value="L-M-V">
              Lunes, Miércoles y Viernes
            </Select.Option>
            <Select.Option value="M-J-S">
              Martes, Jueves y Sábados
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Vacantes"
          name="vacancies"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <InputNumber min={1} max={4} placeholder={1} />
        </Form.Item>
        <Form.Item
          label="Rango de Horario"
          name="hour"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Expample 10am-11am" />
        </Form.Item>
        <Form.Item {...tailLayoutForm}>
          <Button type="primary" htmlType="submit">
            {typeAction === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </>
  );
}

export default withFormShift(FormShift);
