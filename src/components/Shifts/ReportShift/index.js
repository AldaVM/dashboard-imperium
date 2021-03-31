import { useContext } from "react";
import { Typography } from "antd";
import { ShiftContext } from "../../../context";
import FormTimetableReport from "../../Form/FormTimetableReport";
import ReportTableShifts from "../ReportTableShift";

const { Title } = Typography;

export default function ReportShift() {
  const { shifts } = useContext(ShiftContext);

  return (
    <>
      <Title>Reporte Vacantes por Turnos</Title>
      <FormTimetableReport />
      <ReportTableShifts shifts={shifts} />
    </>
  );
}
