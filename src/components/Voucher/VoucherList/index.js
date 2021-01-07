import { Card, List } from "antd";

export default function ListVouchers({ client }) {
  return (
    <List
      dataSource={client?.vouchers}
      renderItem={(voucher) => (
        <List.Item>
          <Card title={voucher._id} style={{ width: "100%" }}>
            <p>Inicio: {voucher?.date_init}</p>
            <p>Expiración: {voucher?.date_expiration}</p>
            <p>Monto: {voucher?.total}</p>
          </Card>
        </List.Item>
      )}
    ></List>
  );
}
