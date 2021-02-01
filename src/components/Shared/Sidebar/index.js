import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import {
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  CalendarOutlined,
  MoneyCollectOutlined,
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
          <ItemListMenu key="1" icon={<CalendarOutlined />}>
            <Link href="/timetable">
              <a>Turnos</a>
            </Link>
          </ItemListMenu>
          <ItemListMenu key="2" icon={<UsergroupAddOutlined />}>
            <Link href="/client">
              <a>Clientes</a>
            </Link>
          </ItemListMenu>
          <ItemListMenu key="3" icon={<UserOutlined />}>
            <Link href="/admin">
              <a>Perfil</a>
            </Link>
          </ItemListMenu>
          <ItemListMenu key="4" icon={<MoneyCollectOutlined />}>
            <Link href="/paid">
              <a>Registrar Voucher</a>
            </Link>
          </ItemListMenu>
          <ItemListMenu key="6" icon={<MoneyCollectOutlined />}>
            <Link href="/vouchers">
              <a>Comprobantes</a>
            </Link>
          </ItemListMenu>
          <ItemListMenu
            key="5"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
          >
            Salir
          </ItemListMenu>
        </Menu>
      </Sider>
    </>
  );
}
