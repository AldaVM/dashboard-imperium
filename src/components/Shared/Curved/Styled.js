import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

const animateWave = keyframes `
    0% {
      transform: scale(1,0);
    }
    50% {
      transform: scale(1,.7);
    }
    100% {
      transform: scale(1,0);
    }
`;

const CurvedStyled = styled.div `
  position: fixed;
  width: 100%;
  ${({ top }) => (top ? "top:0px;" : null)}
  ${({ bottom }) => (bottom ? "bottom:0px;" : null)}
svg {
    display: block;
    transform-origin: bottom;
    animation: ${animateWave} 4000ms cubic-bezier(0.23, 1, 0.32, 1) infinite alternate;
  }
`;

export { CurvedStyled };