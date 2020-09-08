import { Form, Input, Button, Spin, Select } from "antd";
import fetchData from "../../../helpers/fetchData";
import { URL_API } from "../../../constants";
import { useState, useContext, useEffect } from "react";
import { ClientContext } from "../../../context";
import { notification } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function FormUpdateCustomer({ initialValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { updateClients } = useContext(ClientContext);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...initialValues,
    });
  }, [initialValues]);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const parseValues = Object.keys(values).reduce(
        (validateValue, currentValue) => {
          if (values[currentValue] && currentValue !== "_id") {
            validateValue[currentValue] = values[currentValue];
          }
          return validateValue;
        },
        {}
      );
      const response = await fetchData(`${URL_API}/customer/${values._id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseValues),
      });
      setIsLoading(false);
      notification.success({
        message: `Registro actualizado!`,
        placement: "topRight",
        style: { width: 300 },
      });
      updateClients();
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: `Algo anda mal!`,
        placement: "topRight",
        style: { width: 300 },
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        {...layout}
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </>
  );
}
