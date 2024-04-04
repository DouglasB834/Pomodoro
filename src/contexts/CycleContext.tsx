import { ReactNode, createContext, useReducer, useState } from "react";

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
  //criando userReduce ,recebe FN com 2 parametros e valor inicial
  //useReduce e usado somente para armazenar informações complexas e precisa ser mudadas constante mente com informações vindo de varias fontes e components diferentes .
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(state);
    console.log(action);
    if (action.type === "ADD_NEW_CYCLE") {
      return [...state, action.payload.newCycle];
    }
    return state;
  }, []); //valor inicial

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  //armazenar o segundos que foi passado -1
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
    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    // setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  };

  // interruption cycle
  function handleInterruptCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    setActiveCycleId(null);
  }

  //fn que finaliza cycle
  function markCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
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
