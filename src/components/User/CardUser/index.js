import { Card, List } from "antd";
import { ItemList } from "./Styled";

export default function CardUser({ user }) {
  return (
    <Card title="Perfil" style={{ width: "100%" }}>
      <List
        dataSource={user}
        renderItem={(item) => (
          <List.Item>
            <ItemList>
              <span>{item.title}</span>
              <span>{item.value}</span>
            </ItemList>
          </List.Item>
        )}
      ></List>
    </Card>
  );
}
