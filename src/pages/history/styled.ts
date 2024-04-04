import styled from "styled-components";

export const HistoryCaontainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
  padding: 3rem;

  h1 {
    font-size: 1.7rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;
export const HistoryList = styled.div`
  flex: 1;
  margin-top: 2rem;
  overflow-y: auto;

  table {
    width: 100%;
    align-items: start;
    border-collapse: collapse;
    min-width: 600px;
    gap: 1rem;
  }

  th {
    background-color: ${(props) => props.theme["gray-600"]};
    padding: 1rem;
    text-align: left;
    font-size: 0.9rem;
    line-height: 1.6;
    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: red;
    padding: 1rem;
    background-color: ${(props) => props.theme["gray-700"]};
    border-top: 4px solid ${(props) => props.theme["gray-800"]};

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }

    &:first-child {
      width: 50%;
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`;

const STATUS_COLORS = {
  green: "green-500",
  yellow: "yellow-500",
  red: "red-500",
}; //as const : para reforça a type

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: " ";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;
