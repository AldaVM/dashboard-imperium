import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ClientContext } from "../../../context";

export default function FormSearchCustomer() {
  const [form] = Form.useForm();
  const { getClientByDNI } = useContext(ClientContext);

  const onFinish = (values) => {
    const { dni } = values;
    getClientByDNI(dni);
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="dni"
        rules={[
          {
            required: true,
            message: "El DNI es requerido!",
          },
        ]}
        hasFeedback
        size="large"
      >
        <Input
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: "#BFBFBF" }}
            />
          }
          placeholder="DNI del cliente"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
        >
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
}
