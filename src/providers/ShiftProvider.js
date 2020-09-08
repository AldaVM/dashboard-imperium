import { ShiftContext } from "../context";
import { useState } from "react";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

export default function ShifProvider({ children, initialValues }) {
  const [shifts, setShifts] = useState(initialValues.shifts);
  const [countShifts, setCountShifts] = useState(initialValues.countShifts);

  async function updateShifts() {
    try {
      const { get } = serviceFetch("timetable");
      const response = await get();

      validateResponse(response.status, "List Timetable");
      setShifts(response?.data?.records);
      setCountShifts(response?.data?.count);
    } catch (error) {
      setShifts([]);
      setCountShifts(0);
    }
  }

  return (
    <ShiftContext.Provider value={{ shifts, countShifts, updateShifts }}>
      {children}
    </ShiftContext.Provider>
  );
}
