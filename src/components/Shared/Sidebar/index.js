import React from "react";
import { Layout, Menu } from "antd";
import Link from 'next/link';
import {
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ItemListMenu } from "./Styled";
import { useAuth } from "../../../hooks";
const { Sider } = Layout;


export default function SidebarComponent({ collapsed }) {
  const { logout } = useAuth();
  
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <ItemListMenu key="1" icon={<UserOutlined />}>
            <Link href="/admin"><a>Profile</a></Link>
          </ItemListMenu>
          <ItemListMenu key="2" icon={<UsergroupAddOutlined />}>
          <Link href="/client"><a>Clients</a></Link>
          </ItemListMenu>
          <ItemListMenu key="3" icon={<LogoutOutlined />} onClick={()=>logout()}>
            Close
          </ItemListMenu>
        </Menu>
      </Sider>
    </>
  );
}
