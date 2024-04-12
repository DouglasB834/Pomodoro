import { useContext } from "react";
import { HistoryCaontainer, HistoryList, Status } from "./styled";
import { CyclesContext } from "../../contexts/CycleContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryCaontainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          {/* <th> */}
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* </th> */}
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle?.id}>
                <td>{cycle?.task}</td>
                <td>{cycle?.minuteAmount} minutos</td>
                <td>
                  {/* converte para new Data se for necessario */}
                  {formatDistanceToNow(cycle?.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluido</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">interrompido</Status>
                  )}
                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryCaontainer>
  );
};
