import styled from "@emotion/styled";

const WrapperLayout = styled.section `
  margin:auto;
  max-width:960px;
  width: 100%;
  min-height: 100vh;
 /*  background-color: #fafafa; */
  display: grid;
  grid-template-areas: "slider form";
  grid-template-columns: 1fr 1fr;
  @media(max-width:750px){
    grid-template-areas: "slider" "form";
    grid-template-columns:1fr;
  }
`;

const SliderArea = styled.div `
  grid-area: slider;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormArea = styled.div `
  grid-area: form;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width:450px){
    align-self: flex-start;
    margin-top:1rem;
  }
`;

export {
    WrapperLayout,
    SliderArea,
    FormArea
}