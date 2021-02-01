import { Card } from "antd";

export default function PaidCard({ client }) {
  let reportTotal = client?.vouchers.reduce(
    (report, voucher) => {
      report.total_rate += voucher.rate;
      report.total_residue += voucher.residue;
      report.total_amount_paid += voucher.amount_paid;
      report.count_completed += voucher.status_paid === "completed" ? 1 : 0;
      report.count_residue += voucher.status_paid === "pending" ? 1 : 0;
      return report;
    },
    {
      total_rate: 0,
      total_residue: 0,
      total_amount_paid: 0,
      count_completed: 0,
      count_residue: 0,
    }
  );

  return (
    <Card title={`Totales`} bordered={false} style={{ width: 400 }}>
      <p>Total tarifas: S/ {reportTotal.total_rate}</p>
      <p>Total montos pagados: S/ {reportTotal.total_amount_paid}</p>
      <p>Total montos pendientes: S/ {reportTotal.total_residue}</p>
      <p>Cantidad vouchers cancelados: # {reportTotal.count_completed}</p>
      <p>Cantidad vouchers pendientes: # {reportTotal.count_residue}</p>
      <p>Vouchers registrados: # {client?.vouchers.length}</p>
    </Card>
  );
}
