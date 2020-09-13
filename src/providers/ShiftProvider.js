import { ShiftContext } from "../context";
import { useState } from "react";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

export default function ShifProvider({ children, initialValues }) {
  const [shifts, setShifts] = useState(initialValues.shifts);
  const [countShifts, setCountShifts] = useState(initialValues.countShifts);
  const [shift, setShift] = useState(initialValues.shift);

  async function updateShifts() {
    try {
      const { get } = serviceFetch("timetable");
      const response = await get();

      validateResponse(response.status, "List Timetable");
      setShifts(response?.data?.records);
      setCountShifts(response?.data?.count);
    } catch (error) {
      validateResponse(error.status, "Error to request");
      setShifts([]);
      setCountShifts(0);
    }
  }

  async function updateShift(id) {
    try {
      const { get } = serviceFetch(`timetable/${id}`);
      const response = await get();

      validateResponse(response.status, "To view Shift");
      setShift(response?.data);
    } catch (error) {
      validateResponse(error.status, "Error to request");
      setShift({
        customers: [],
      });
    }
  }

  return (
    <ShiftContext.Provider
      value={{ shifts, countShifts, updateShifts, updateShift, shift }}
    >
      {children}
    </ShiftContext.Provider>
  );
}
