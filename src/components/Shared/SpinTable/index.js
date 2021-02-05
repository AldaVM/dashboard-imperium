import styled from "@emotion/styled";

export const ContainerSpin = styled("div")`
  position: relative;
  background: rgba(0, 0, 0, 0.05);
  margin-top: 1em;
`;

export const WrapperSpin = styled("div")`
  position: absolute !important;
  width: 100%;
  height: 100%;
  top: 0;
  lef: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
