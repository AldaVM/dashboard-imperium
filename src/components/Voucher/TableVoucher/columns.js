import { Tag } from "antd";

export const columnsGeneric = [
  {
    title: "Monto a pagar",
    dataIndex: "rate",
    key: "rate",
    width: 100,
  },
  {
    title: "Monto pagado",
    dataIndex: "amount_paid",
    key: "amount_paid",
    width: 100,
  },
  {
    title: "Monto pendiente",
    dataIndex: "residue",
    key: "residue",
    width: 100,
  },
  {
    title: "Estado Pago",
    dataIndex: "status_paid",
    key: "status_paid",
    width: 100,
    render: (status_paid) => {
      let color = status_paid === "pending" ? "tomato" : "green";

      return (
        <>
          <Tag color={color} key={status_paid}>
            {status_paid.toUpperCase()}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Vigencia",
    dataIndex: "date_expiration",
    key: "validity_date",
    width: 100,
    render: (date_expiration) => {
      let currentDate = new Date();

      let isValidity = currentDate > new Date(date_expiration);
      let validity = isValidity ? "Expirado" : "Vigente";
      let color = isValidity ? "tomato" : "green";

      return (
        <>
          <Tag color={color} key={date_expiration}>
            {validity.toUpperCase()}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Vence en",
    dataIndex: "date_expiration",
    key: "validity_rage",
    width: 100,
    render: (value) => {
      let currentDate = new Date();
      let dayExpiration = new Date(value);
      let differenceInTime = dayExpiration.getTime() - currentDate.getTime();
      let differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));
      let message =
        differenceInDays > 0
          ? `Expira en ${differenceInDays} días`
          : `No vigente`;

      let color =
        differenceInDays > 0 && differenceInDays <= 5
          ? "tomato"
          : differenceInDays < 0
          ? "gray"
          : "skyblue";

      return (
        <>
          <Tag color={color} key={value}>
            {message}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Fecha de creación",
    dataIndex: "date_init",
    key: "date_init",
    width: 120,
  },
  {
    title: "Fecha de expiración",
    dataIndex: "date_expiration",
    key: "date_expiration",
    width: 120,
  },
  {
    title: "Turno",
    dataIndex: "turn_detail",
    key: "turn_detail",
    width: 100,
  },
  {
    title: "Modalidad",
    dataIndex: "type_modality",
    key: "type_modality",
    width: 80,
  },
];
