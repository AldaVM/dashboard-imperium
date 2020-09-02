import styled from "@emotion/styled";
import {
    keyframes
} from "@emotion/core";

const animationSlider = keyframes `
0% {
        margin-left: 0px;
}
25% {
        margin-left: 0px;
}
45%{
    margin-left:-100%;
}
65%{
    margin-left:-100%;
}
75%{
    margin-left:0%; 
}
100%{
    margin-left:0%; 
}
`;

const SliderStyled = styled.section `
  width: 320px;
  height: 320px;
  overflow: hidden;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    animation: ${animationSlider} 15s ease-in-out infinite alternate;
    &:hover {
      animation-play-state: paused;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media(max-width:350px){
    width: 280px;
    height: 280px;
  }
  @media(max-width:280px){
    width: 250px;
    height: 250px;
  }
`;


export {
    SliderStyled
}