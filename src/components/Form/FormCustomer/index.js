import { Form, Input, Button, Spin, notification } from "antd";
import fetchData from "../../../helpers/fetchData";
import { URL_API } from "../../../constants";
import { useState, useContext } from "react";
import { ClientContext } from "../../../context";

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

export default function FormCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { updateClients } = useContext(ClientContext);

  const onFinish = async (values) => {
    try {
      console.log(values);
      setIsLoading(true);
      const response = await fetchData(`${URL_API}/customer/`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setIsLoading(false);
      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: `Cliente registrado!`,
          placement: "topRight",
          style: { width: 300 },
        });
        updateClients();
      }
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: `Algo anda mal!`,
        placement: "topRight",
        style: { width: 300 },
      });
      console.log(error);
    }
  };

  return (
    <>
      <Form
        {...layout}
        name="form_client"
        initialValues={{
          remember: true,
        }}
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
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
      {message && <span>{message}</span>}
    </>
  );
}
