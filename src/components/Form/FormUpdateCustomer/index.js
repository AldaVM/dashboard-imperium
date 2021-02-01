import { Form, Input, Button, Spin, Select } from "antd";
import { useState, useEffect } from "react";

import serviceFetch from "../../../helpers/closureFetch";
import validateResponse from "../../../helpers/validationsReponse";
import { layoutForm, tailLayoutForm } from "../complements";

const cleanRequestValues = (values) => {
  return Object.keys(values).reduce((parseValues, value) => {
    if (values[value] && value !== "_id") {
      parseValues[value] = values[value];
    }

    return parseValues;
  }, {});
};

export default function FormUpdateCustomer({ initialValues, updatedValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...initialValues,
    });
  }, [initialValues]);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);

      const parseValues = cleanRequestValues(values);
      const { update } = serviceFetch(`customer/${values._id}`);
      const response = await update(parseValues);
      setIsLoading(false);
      validateResponse(response.status, "Update Client");
      updatedValues();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      validateResponse(error.status, "Client");
    }
  };

  return (
    <>
      <Form
        form={form}
        {...layoutForm}
        name="form_update_client"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nombres"
          name="names"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Ingresa los nombres del cliente" />
        </Form.Item>
        <Form.Item
          label="Apellidos"
          name="surnames"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Ingresa los apellidos del cliente" />
        </Form.Item>
        <Form.Item
          label="DNI"
          name="dni"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Ingresa el dni del cliente" />
        </Form.Item>
        <Form.Item label="Dirección" name="address">
          <Input placeholder="Ingresa la dirección del cliente" />
        </Form.Item>
        <Form.Item label="Celular" name="phone_number">
          <Input placeholder="Ingresa el número de contacto del cliente" />
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <Input
            placeholder="Ingresa la fecha de nacimiento del cliente"
            type="date"
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Ingresa el email del cliente" type="email" />
        </Form.Item>

        <Form.Item label="Genero" name="gender">
          <Select>
            <Select.Option value="male">Hombre</Select.Option>
            <Select.Option value="female">Mujer</Select.Option>
            <Select.Option value="other">Otro</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="_id"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
          hidden
        >
          <Input placeholder="" hidden />
        </Form.Item>

        <Form.Item {...tailLayoutForm}>
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </>
  );
}
