import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc/privateRouter";
import ReportShift from "../src/components/Shifts/ReportShift";
import ShifProvider from "../src/providers/ShiftProvider";

function ReportTimetable() {
  return (
    <ShifProvider
      initialValues={{
        shifts: [],
        countShifts: 0,
      }}
    >
      <LayoutAdmin>
        <ReportShift />
      </LayoutAdmin>
    </ShifProvider>
  );
}

export default ProtectRoute(ReportTimetable);
