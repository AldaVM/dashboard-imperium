import React from 'react'
import { Layout } from "antd";
const { Header } = Layout;
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from "@ant-design/icons";

export default function HeaderComponent({toggle,collapsed}) {
    return (
        <>
         <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: ()=>toggle(collapsed),
                  }
                )}
              </Header>
        </>
    )
}
