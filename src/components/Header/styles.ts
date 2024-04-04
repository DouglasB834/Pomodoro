import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      color: ${(props) => props.theme["gray-100"]};

      &.active {
        color: ${(props) => props.theme["green-500"]};
      }

      &::after {
        content: " ";
        position: absolute;
        color: red;
        height: 2px;
        width: 1%;
        bottom: 0;
        left: 0;
        transition: 0.2s linear;

        background-color: ${(props) => props.theme["green-500"]};
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
`;
