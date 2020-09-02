import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FormComponent } from "./Styled";
import { useRouter } from "next/router";
import {useAuth} from '../../../hooks';


export default function FormLoginComponent() {
  const router = useRouter();
  const { login } = useAuth();
  const onFinish = async(values) => {
    const{email,password}=values;
    const resp=await login(email,password);
    resp?router.push('/admin'):console.log(false);
  };
  return (
    <>
      <FormComponent
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Ingrese su correo!",
            },
          ]}
          hasFeedback 
        >
          <Input
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ color: "#BFBFBF" }}
              />
            }
            placeholder="Ingrese su email"
          />
        </Form.Item>
        <Form.Item hasFeedback 
          name="password"
          rules={[
            {
              required: true,
              message: "Ingrese su contraseña!",
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: "#BFBFBF" }}
              />
            }
            type="password"
            placeholder="Ingrese su contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Login
          </Button>
        </Form.Item>
      </FormComponent>
    </>
  );
}
