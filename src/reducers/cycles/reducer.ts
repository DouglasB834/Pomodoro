import { produce } from "immer";
import { Cycle } from "../../contexts/CycleContext";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReduce(state: CyclesState, action: any) {
  switch (action.type) {
    //head code
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };
      // nao faz diferença
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleId: null,
      // };

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleId: null,
      // };
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    default:
      return state;
  }
}
