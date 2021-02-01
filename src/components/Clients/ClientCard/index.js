import { Card } from "antd";

export default function CardClient({ client }) {
  const turn =
    client?.timetable.length > 1
      ? `${client?.timetable[0].class_shift} - ${client?.timetable[0].hour} - all days`
      : client?.timetable.length === 1
      ? `${client?.timetable[0].class_shift} - ${client?.timetable[0].hour} - ${client?.timetable[0].intermediate_days}`
      : "No encontrado";

  return (
    <Card
      title={`Información del Cliente`}
      bordered={false}
      style={{ width: 500 }}
    >
      <p>
        Nombre: {client.names} {client.surnames}
      </p>
      <p>DNI: {client.dni}</p>
      <p>Turno: {turn.toUpperCase()}</p>
      <p>Número de celular: {client.phone_number}</p>
      <p>Modalidad: {client.type_modality}</p>
      <p>Estado últimos pagos: {client.status_paid}</p>
    </Card>
  );
}
