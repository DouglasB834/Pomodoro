import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;

  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const BasetButton = styled.button`
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 5px;
  border: 0;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme["gray-100"]};
  background-color: ${(props) => props.theme["green-500"]};
  transition: 0.3s linear;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartButton = styled(BasetButton)`
  background-color: ${(props) => props.theme["green-500"]};

  &:not(:disabled) :hover {
    background-color: ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["gray-600"]};
  }
`;
export const StoptButton = styled(BasetButton)`
  background-color: ${(props) => props.theme["red-500"]};

  &:not(:disabled) :hover {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;
