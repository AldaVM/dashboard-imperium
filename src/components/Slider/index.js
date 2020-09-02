import React from "react";
import { SliderStyled } from "./Styled";

export default function SliderComponent() {
  return (
    <>
      <SliderStyled>
        <div>
          <img
            src="https://res.cloudinary.com/dbxg3ojl8/image/upload/v1598216005/undraw_fitness_esh2wb.png"
            alt="image running"
          />
          <img
            src="https://res.cloudinary.com/dbxg3ojl8/image/upload/v1598216005/undraw_yoga_yekcsn.png"
            alt="image fitnes"
          />
        </div>
      </SliderStyled>
    </>
  );
}
