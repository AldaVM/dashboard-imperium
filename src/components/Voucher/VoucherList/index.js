import { Card, List, Tag } from "antd";

export default function ListVouchers({ client }) {
  return (
    <List
      dataSource={client?.vouchers}
      renderItem={(voucher) => (
        <List.Item>
          <Card title={`${voucher._id}`} style={{ width: "100%" }}>
            <p>Inicio: {voucher?.date_init}</p>
            <p>Expiración: {voucher?.date_expiration}</p>
            <p>Tarifa: {voucher?.rate}</p>
            <p>Monto pagado: {voucher?.amount_paid}</p>
            <p>Monto a pagar: {voucher?.residue}</p>
            <p>
              Estado:{" "}
              <Tag
                color={voucher?.status_paid === "pending" ? "tomato" : "green"}
                key={client?._id}
              >
                {voucher?.status_paid.toUpperCase()}
              </Tag>
            </p>
          </Card>
        </List.Item>
      )}
    ></List>
  );
}
