import { ArrowBigRightDash, HandIcon } from "lucide-react";
import { HomeContainer, StartButton, StoptButton } from "./styled";
import * as zod from "zod";

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CycleContext";

// export interface Cycle {
//   id: string;
//   task: string;
//   minuteAmount: number;
//   startDate: Date;
//   interruptedDate?: Date;
//   finishedDate?: Date;
// }

// interface CyclesContextType {
//   activeCycle?: Cycle;
//   activeCycleId: string | null;
//   markCycleAsFinished: () => void;
//   amountSecondsPassed: number;
//   setSecondsPassed: (seconds: number) => void;
// }

// export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, "Informe a tarefa"),
  minuteAmount: zod
    .number()
    .min(5, "O ciclo precisa ser no minimo 5")
    .max(60, "o ciclo no máximo pode ser 60 min"),
});
export type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // //armazenar o segundos que foi passado -1
  // const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // function markCycleAsFinished() {
  //   setCycles((state) =>
  //     state.map((cycle) => {
  //       if (cycle.id === activeCycleId) {
  //         return { ...cycle, finishedDate: new Date() };
  //       } else {
  //         return cycle;
  //       }
  //     })
  //   );
  // }
  // function setSecondsPassed(segund: number) {
  //   setAmountSecondsPassed(segund);
  // }

  const { activeCycle, createNewCycle, handleInterruptCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minuteAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  // const { handleSubmit, register, reset, watch } = useForm<newCycleFormData>({
  //   resolver: zodResolver(newCycleFormValidationSchema),
  //   defaultValues: {
  //     task: "",
  //     timeAmount: 0,
  //   },
  // });

  // const handleCreateNewCycle = (data: newCycleFormData) => {
  //   const id = String(new Date().getTime());

  //   //criando um novo ciclo e adicionando no array de ciclos.
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minuteAmount: data.timeAmount,
  //     startDate: new Date(),
  //   };

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(id);
  //   setAmountSecondsPassed(0);
  //   reset();
  // };

  // function handleInterruptCycle() {
  //   setActiveCycleId(null);

  //   setCycles((state) =>
  //     state.map((cycle) => {
  //       if (cycle.id === activeCycleId) {
  //         return { ...cycle, interruptedDate: new Date() };
  //       } else {
  //         return cycle;
  //       }
  //     })
  //   );
  // }

  //passar para dentro de uma função o ciclo ativo no momento

  //tranforma minutos em segundos pra ficar mais facil . cad minuto e 60 segundos. minutos * 60
  //se tiver um cycle ativo :

  // const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  // // converte o total para minito pq preciso renderizar em tela, nao esquecer de arredondar numero para baixo (cada sessenta segundo em 1 min)
  // const minutoAmount = Math.floor(currentSeconds / 60);
  // //pegando o resto que nao cabe em 1minto pega os segundos que sobra
  // const secondsAmount = currentSeconds % 60;

  // const seconds = String(secondsAmount).padStart(2, "0");
  // const minutes = String(minutoAmount).padStart(2, "0");

  // // se tiver um ciclo ativo, alterar o titulo da pagina com os minutos e segundos.
  // useEffect(() => {
  //   if (activeCycle) {
  //     document.title = `${minutes}:${seconds}`;
  //   }
  // }, [minutes, seconds, activeCycle]);

  const handleCreatenewCycle = (data: newCycleFormData) => {
    createNewCycle(data);
    reset;
  };

  const taks = watch("task");
  const isSubmitDisabled = !taks;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreatenewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StoptButton
            title="Começar tarefa"
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandIcon size={19} />
            interromper
          </StoptButton>
        ) : (
          <StartButton
            disabled={isSubmitDisabled}
            title="Começar tarefa"
            type="submit"
          >
            <ArrowBigRightDash size={19} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  );
};
