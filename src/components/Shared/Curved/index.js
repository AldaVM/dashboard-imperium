import React from "react";
import { CurvedStyled } from "./Styled";

const CurvedTop=()=>(
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path
            fill="#6C63FF"
            fillOpacity="1"
            d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,197.3C672,224,768,256,864,261.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
    </>
)
const CurvedBottom=()=>(
    <>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300" width="100%" height="100%">
          <path
            fill="#6C63FF"
            fillOpacity="1"
            d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,197.3C672,224,768,256,864,261.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
    </>
)
export default function CurvedComponent({top,bottom}) {
  return (
    <>
      <CurvedStyled top={top} bottom={bottom}>
        {top&&<CurvedTop/>}
        {bottom&&<CurvedBottom/>}
      </CurvedStyled>
    </>
  );
}
