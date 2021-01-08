import { Card } from "antd";

export default function CardClient({ client }) {
  return (
    <Card
      title={`Cliente - ${client.names} ${client.surnames}`}
      bordered={false}
      style={{ width: 500 }}
    >
      <p>DNI: {client.dni}</p>
      <p>Turno: {client.turn}</p>
      <p>Modalidad: {client.type_modality}</p>
    </Card>
  );
}