import React, { useContext, useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { ClientContext } from "../../../context";
import { ContainerSpin, WrapperSpin } from "../../Shared/SpinTable";

const validationFilters = function (filters) {
  const keys = Object.keys(filters);

  return keys.reduce((newFilters, keyFilter) => {
    if (filters[keyFilter]) {
      newFilters[keyFilter] = filters[keyFilter];
    }
    return newFilters;
  }, {});
};

export default function FormSearchCustomer() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { getClientByFilters } = useContext(ClientContext);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const filters = validationFilters(values);
      await getClientByFilters(filters);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="dni" hasFeedback size="large">
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
      <Form.Item name="names" hasFeedback size="large">
        <Input
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: "#BFBFBF" }}
            />
          }
          placeholder="Nombre del cliente"
        />
      </Form.Item>
      <Form.Item name="surnames" hasFeedback size="large">
        <Input
          prefix={
            <UserOutlined
              className="site-form-item-icon"
              style={{ color: "#BFBFBF" }}
            />
          }
          placeholder="Apellidos del cliente"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          icon={<SearchOutlined />}
          block
        >
          Buscar
        </Button>
      </Form.Item>
      <ContainerSpin>
        {isLoading && (
          <WrapperSpin>
            <Spin size="large" />
          </WrapperSpin>
        )}
      </ContainerSpin>
    </Form>
  );
}
