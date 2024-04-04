import { useContext } from "react";
import { FormContainer, MinuteInput, TaskInput } from "./styled";

import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CycleContext";

// const newCycleFormValidationSchema = zod.object({
//   task: zod.string().min(1, "Informe a tarefa"),
//   timeAmount: zod
//     .number()
//     .min(5, "O ciclo precisa ser no minimo 5")
//     .max(60, "o ciclo no máximo pode ser 60 min"),
// });
// type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);

  // const { handleSubmit, register, reset, watch } = useForm<newCycleFormData>({
  //   resolver: zodResolver(newCycleFormValidationSchema),
  //   defaultValues: {
  //     task: "",
  //     timeAmount: 0,
  //   },
  // });
  //com o provider pegando somente o form vc consegui buscar o register que precisa
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="task_options"
        placeholder="Digite o nome da tarefa"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task_options">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>
      <label htmlFor="minuteAmount">durante</label>
      <MinuteInput
        id="minuteAmount"
        placeholder="00"
        type="number"
        step="5"
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minuteAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
};
