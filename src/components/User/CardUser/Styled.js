import styled from "@emotion/styled";

export const ItemList = styled("div")`
  display: flex;
  width: 100%;

  span:nth-of-type(1) {
    width: 40%;
    max-width: 200px;
    text-transform: uppercase;
  }

  span:nth-of-type(2) {
    width: 100%;
    margin-left: 1em;
    text-transform: none;
    font-weight: bold;
    font-size: 1.2em;
  }
`;
