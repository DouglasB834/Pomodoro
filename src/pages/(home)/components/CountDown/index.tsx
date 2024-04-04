import { useContext, useEffect } from "react";

import { FormContentTime, SecondTimeSpace } from "./styled";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CycleContext";

export const CountDown = () => {
  // const [amountSecondsPassed, setSecondsPassed] = useState(0);
  const {
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    //se tiver um cycle ativo: limpar
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCycleAsFinished,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  // converte o total para minito pq preciso renderizar em tela, nao esquecer de arredondar numero para baixo (cada sessenta segundo em 1 min)
  const minutoAmount = Math.floor(currentSeconds / 60);
  //pegando o resto que nao cabe em 1minto pega os segundos que sobra
  const secondsAmount = currentSeconds % 60;

  const seconds = String(secondsAmount).padStart(2, "0");
  const minutes = String(minutoAmount).padStart(2, "0");

  // se tiver um ciclo ativo, alterar o titulo da pagina com os minutos e segundos.
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <FormContentTime>
      <span>{minutes[0]} </span>
      <span>{minutes[1]} </span>
      <SecondTimeSpace>:</SecondTimeSpace>
      <span>{seconds[0]} </span>
      <span>{seconds[1]} </span>
    </FormContentTime>
  );
};
