import React from "react";
import { ProtectRoute } from "../src/hoc/privateRouter";
import { LayoutAdmin } from "../src/layouts";
import { addElementKey } from "../src/helpers/parseValues";
import ShifProvider from "../src/providers/ShiftProvider";
import ShiftWrapper from "../src/components/Shifts/ShiftWrapper";
import { URL_API } from "../src/constants";

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

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${URL_API}/timetable`);
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
