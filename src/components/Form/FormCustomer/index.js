import { Form, Input, Button, Spin } from "antd";
import { useState, useContext } from "react";
import { ClientContext } from "../../../context";
import validateResponse from "../../../helpers/validationsReponse";
import serviceFetch from "../../../helpers/closureFetch";
import { layoutForm, tailLayoutForm } from "../complements";

export default function FormCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateClients, setClient } = useContext(ClientContext);

  const onFinish = async (values) => {
    try {
      let surnames = "";
      let names = "";

      if (/^([a-zñA-ZÑ0-9\s]){0,15}[a-zñA-ZÑ0-9]$/.test(values.surnames)) {
        surnames = values.surnames;
      }

      if (/^([a-zñA-ZÑ0-9\s]){0,15}[a-zñA-ZÑ0-9]$/.test(values.names)) {
        names = values.names;
      }

      if (surnames && names) {
        setIsLoading(true);
        const { create } = serviceFetch("customer");
        const response = await create({
          surnames,
          names,
          dni: values.dni,
          phone_number: values.phone_number,
        });
        setIsLoading(false);

        validateResponse(response.status, "client");
        setClient(response.data);
        updateClients();
      } else {
        validateResponse(
          500,
          "Validar los campos no pueden tener espacios al final ni al inicio"
        );
      }
    } catch (error) {
      setIsLoading(false);
      validateResponse(error.status, "client");
    }
  };

  return (
    <>
      <Form
        {...layoutForm}
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
        <Form.Item
          label="Número de celular"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
          ]}
        >
          <Input placeholder="Ingresa el celular del cliente" />
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
