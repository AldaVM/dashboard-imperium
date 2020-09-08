import React, { useState } from "react";
import { Layout } from "antd";
import { ContainerDashboardLayout } from "./Styled";
import {HeaderComponent,SidebarComponent} from "../Shared";

const { Content } = Layout;

export default function AdminContainer({children}) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = (collapsed) => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <ContainerDashboardLayout>
        <SidebarComponent collapsed={collapsed} />
        <Layout className="site-layout">
          <HeaderComponent toggle={toggle} collapsed={collapsed} />

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </ContainerDashboardLayout>
    </>
  );
}
