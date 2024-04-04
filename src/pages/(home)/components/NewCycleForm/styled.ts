import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.1rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

export const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  &:focus {
    border-color: ${(props) => props.theme["green-500"]};
    box-shadow: none;
  }
`;

export const MinuteInput = styled(BaseInput)`
  width: 4rem;
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;
