import styled from "styled-components";

export const FormContentTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 8rem;
  font-weight: bold;
  line-height: 8rem;
  font-family: "Roboto Mono";
  color: ${(props) => props.theme["gray-100"]};
  span {
    background-color: ${(props) => props.theme["gray-700"]};
    padding: 0.5rem;
    border-radius: 8px;
  }
`;

export const SecondTimeSpace = styled.span`
  color: ${(props) => props.theme["green-300"]};
  display: flex;
  width: 3.5rem;
  justify-content: center;
  overflow: hidden;
  background-color: transparent !important;
`;
