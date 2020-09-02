import { Menu } from "antd";
import styled from "@emotion/styled";

const ItemListMenu = styled(Menu.Item)
`
&.ant-menu-item-selected{
  background: transparent !important;
}
`;

export {
    ItemListMenu
}