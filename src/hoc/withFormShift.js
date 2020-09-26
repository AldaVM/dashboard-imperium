import { useState, useContext } from "react";
import { ShiftContext } from "../context";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

function withFormShift(Component) {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateShifts } = useContext(ShiftContext);

    const createShift = async (values) => {
      try {
        setIsLoading(true);
        const { create } = serviceFetch("timetable");
        const response = await create(values);
        setIsLoading(false);

        validateResponse(response.status, "Add new Shift");
        updateShifts();
      } catch (error) {
        setIsLoading(false);
        validateResponse(error.status, "Error");
      }
    };

    const updateShift = async (values, id) => {
      try {
        setIsLoading(true);
        const { update } = serviceFetch(`timetable/${id}`);
        const response = await update(values);
        setIsLoading(false);

        validateResponse(response.status, "Turno actualizado");
        updateShifts();
      } catch (error) {
        setIsLoading(false);
        validateResponse(error.status, "Error");
      }
    };

    return (
      <Component
        {...props}
        isLoading={isLoading}
        createShift={createShift}
        updateShift={updateShift}
      />
    );
  };
}

export default withFormShift;
