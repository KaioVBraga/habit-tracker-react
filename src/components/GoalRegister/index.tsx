//@ts-nocheck
import React, { useState, useCallback, FormEvent } from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Deadend from "../Deadend";
import { Container } from "./styles";
import * as Yup from "yup";

interface Goal {
  [key: string]: string;
}
interface Props {
  handleGoal(goal: any): void;
}

const GoalRegister: React.FC<Props> = (props) => {
  const [goal, setGoal] = useState<Goal>({
    title: "",
    description: "",
    reward: "",
    limitDate: "",
  });

  const handleGoalChange = useCallback(
    (e: FormEvent) => {
      const newGoal = { ...goal };
      newGoal[
        (e.target as HTMLInputElement).name
      ] = (e.target as HTMLInputElement).value;
      setGoal(newGoal);
    },
    [goal]
  );

  const handleDeadendChange = useCallback(
    (e: FormEvent) => {
      const newGoal = { ...goal };
      newGoal.limitDate = (e.target as HTMLInputElement).value;

      //   newGoal.limitDate.setHours(
      //     newGoal.limitDate.getHours() +
      //       (3 - newGoal.limitDate.getTimezoneOffset() / 60)
      //   );

      //   newGoal.limitDate = newGoal.limitDate.toISOString();

      setGoal(newGoal);
    },
    [goal]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const goalValidation = Yup.object().shape({
        title: Yup.string().required("Por favor, insira o título da meta."),
        description: Yup.string().required(
          "Por favor, insira a descrição da meta."
        ),
        reward: Yup.string().required(
          "Por favor, insira a recompensa da meta."
        ),
        limitDate: Yup.string().required(
          "Por favor, insira a data limite da meta."
        ),
      });

      goalValidation
        .validate(goal, { abortEarly: true })
        .then((res) => props.handleGoal(goal))
        .catch((err) => {
          if (err instanceof Yup.ValidationError) {
            swal("Erro!", `${err}`.replace("ValidationError:", ""), "error");
          } else {
            swal(
              "Erro!",
              "Verifique os dados passados e tente novamente. Se persistir, contacte o suporte!",
              "error"
            );
          }
        });
    },
    [goal, props]
  );

  return (
    <Container>
      <h1>Defina sua meta</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Título"
          value={goal.title}
          onChange={handleGoalChange}
        />
        <Textarea
          name="description"
          label="Descrição"
          value={goal.description}
          onChange={handleGoalChange}
        />
        <Textarea
          name="reward"
          label="Recompensa"
          value={goal.reward}
          onChange={handleGoalChange}
        />

        <Deadend value={goal.limitDate} onChange={handleDeadendChange} />

        <button>Criar meta</button>
      </form>
    </Container>
  );
};

export default GoalRegister;
