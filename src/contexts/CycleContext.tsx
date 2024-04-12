import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cyclesReduce } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  cycleAsFinishedAction,
  interruptCycleAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReduce,
    {
      //valor inicial
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedCyclesStates = localStorage.getItem("@cycles-pomodoro-1-0-0");
      if (storedCyclesStates) {
        return JSON.parse(storedCyclesStates);
      }
      return initialState;
    }
  ); //valor inicial

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@cycles-pomodoro-1-0-0", stateJSON);
  }, [cyclesState]);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    // const secondsDifference = differenceInSeconds(
    //   new Date(),
    //   activeCycle.startDate
    // );
    return 0;
  }); //valor inicial
  //passar para dentro de uma função o ciclo ativo no momento

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
    dispatch(interruptCycleAction());
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
    dispatch(cycleAsFinishedAction());
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
