import React from "react";
import { ProtectRoute } from "../src/hoc/privateRouter";
import { LayoutAdmin } from "../src/layouts";
import { addElementKey } from "../src/helpers/parseValues";
import ShifProvider from "../src/providers/ShiftProvider";
import ShiftWrapper from "../src/components/Shifts/ShiftWrapper";

function Timetable({ shifts, countShifts }) {
  return (
    <ShifProvider
      initialValues={{
        shifts,
        countShifts,
      }}
    >
      <LayoutAdmin>
        <ShiftWrapper />
      </LayoutAdmin>
    </ShifProvider>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:8000/v1/api/timetable/");
    const json = await res.json();

    return {
      props: {
        shifts: addElementKey(json?.data.records),
        countShifts: json?.data.count,
      },
    };
  } catch (error) {
    return {
      props: {
        shifts: [],
        countShifts: 0,
      },
    };
  }
}

export default ProtectRoute(Timetable);
