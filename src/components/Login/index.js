import React from "react";
import SliderComponent from "../Slider";
import FormLoginComponent from "../Form/FormLogin";
import { WrapperLayout, SliderArea, FormArea } from "./Styled";
import { CurvedComponent } from "../Shared";

export default function LoginContainer() {
  return (
    <>
      <WrapperLayout>
        <SliderArea>
          <SliderComponent />
        </SliderArea>
        <FormArea>
          <FormLoginComponent />
        </FormArea>
      </WrapperLayout>
      <CurvedComponent bottom={true} />
    </>
  );
}
