import { ReactNode, createContext, useReducer, useState } from "react";
import { cyclesReduce } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  cycleAsFinishedAction,
  interruptCycleAction,
} from "../reducers/cycles/actions";

export interface Cycle {
  id: string;
  task: string;
  minuteAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CreateCycleData {
  task: string;
  minuteAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle?: Cycle;
  activeCycleId: string | null;
  markCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  handleInterruptCycle: () => void;
}
interface CyclesContextProvideProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export const CyclesContextProvider = ({
  children,
}: CyclesContextProvideProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReduce, {
    //valor inicial
    cycles: [],
    activeCycleId: null,
  }); //valor inicial

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  //passar para dentro de uma função o ciclo ativo no momento
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  //create new Cycle
  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    //criando um novo ciclo e adicionando no array de ciclos.
    const newCycle: Cycle = {
      id,
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    };
    //adicionando no array de ciclos.
    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  };

  // interruption cycle
  function handleInterruptCycle() {
    dispatch(interruptCycleAction);
    /*
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  */
  }

  //fn que finaliza cycle
  function markCycleAsFinished() {
    dispatch(cycleAsFinishedAction);
    /*
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );*/
  }

  function setSecondsPassed(segund: number) {
    setAmountSecondsPassed(segund);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
