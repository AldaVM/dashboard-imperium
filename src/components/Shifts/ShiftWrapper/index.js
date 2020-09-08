import { useContext, useState, useEffect } from "react";
import { ShiftContext } from "../../../context";
import { Typography } from "antd";
import TableShift from "../TableShifts";
import ActionsShift from "../ActionsShift";

const { Title } = Typography;

export default function ShiftWrapper() {
  const { shifts, countShifts } = useContext(ShiftContext);
  const [shiftActions, setShiftActions] = useState(shifts);

  useEffect(() => {
    setShiftActions(
      shifts.reduce((accumulator, currentValue) => {
        accumulator.push({
          ...currentValue,
          key: currentValue._id,
        });
        return accumulator;
      }, [])
    );
  }, [shifts]);

  return (
    <>
      <Title>Turnos</Title>
      <Title level={5}>
        Turnos registrados: {countShifts ? countShifts : 0}
      </Title>
      <ActionsShift />
      <TableShift shifts={shiftActions}></TableShift>
    </>
  );
}
