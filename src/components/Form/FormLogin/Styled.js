import styled from "@emotion/styled";
import { Form } from "antd";

const FormComponent = styled(Form)
`
  width: 320px;
  z-index:99;
  @media(max-width:350px){
    width: 280px;
  }
  @media(max-width:280px){
    width: 250px;
  }
`;

export {
    FormComponent
}