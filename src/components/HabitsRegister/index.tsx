import React, { useState, useCallback, FormEvent } from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import Frequency from "../Frequency";
import { Container, PlusIcon } from "./styles";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import swal from "sweetalert";

interface Props {
  handleHabits(habits: { [key: string]: any }): void;
  goal_id: number;
}

// interface Habit {
//     [key: string]: string | number[];
// }

interface Habit {
  [key: string]: any;
}

const HabitsRegister: React.FC<Props> = (props) => {
  const { goals, activeHabit } = useSelector((state: any) => ({
    goals: state.goals,
    activeHabit: state.activeHabit,
  }));

  const [habits, setHabits] = useState<Array<Habit>>([
    {
      title: "",
      description: "",
      reward: "",
      frequency: [],
      qualitative: 1,
      base: 0,
      weekDays: [
        { symbol: "D", marked: false },
        { symbol: "S", marked: false },
        { symbol: "T", marked: false },
        { symbol: "Q", marked: false },
        { symbol: "Q", marked: false },
        { symbol: "S", marked: false },
        { symbol: "S", marked: false },
      ],
      goal_id: goals[activeHabit.goalIndex].id,
    },
  ]);

  const handleWeekDaysChange = useCallback(
    (indexI, indexJ) => {
      const newHabits = [...habits];
      newHabits[indexI].weekDays[indexJ].marked = !newHabits[indexI].weekDays[
        indexJ
      ].marked;
      newHabits[indexI].frequency = newHabits[indexI].weekDays
        .map((day: { symbol: string; marked: boolean }, index: number) =>
          day.marked ? index : -1
        )
        .filter((index: number) => index > -1);
      setHabits(newHabits);
    },
    [habits]
  );

  const handleHabitsTextAreaChange = useCallback(
    (e: FormEvent, index: number) => {
      const newHabits = [...habits];
      newHabits[index][
        (e.target as HTMLInputElement).name
      ] = (e.target as HTMLInputElement).value;
      setHabits(newHabits);
    },
    [habits]
  );

  const handleHabitsInputChange = useCallback(
    (e: FormEvent, index: number) => {
      const newHabits = [...habits];
      newHabits[index][
        (e.target as HTMLTextAreaElement).name
      ] = (e.target as HTMLTextAreaElement).value;
      setHabits(newHabits);
    },
    [habits]
  );

  const handleHabitsCheckChange = useCallback(
    (e: FormEvent, index: number) => {
      const { name } = e.target as HTMLInputElement;
      const newHabits = [...habits];

      newHabits[index][name] = newHabits[index][name] === 1 ? 0 : 1;
      setHabits(newHabits);
    },
    [habits]
  );

  const addHabits = useCallback(() => {
    const newHabits = [...habits];
    newHabits.push({
      title: "",
      description: "",
      reward: "",
      frequency: [],
      qualitative: 1,
      base: 0,
      weekDays: [
        { symbol: "D", marked: false },
        { symbol: "S", marked: false },
        { symbol: "T", marked: false },
        { symbol: "Q", marked: false },
        { symbol: "Q", marked: false },
        { symbol: "S", marked: false },
        { symbol: "S", marked: false },
      ],
      goal_id: goals[activeHabit.goalIndex].id,
    });
    setHabits(newHabits);
  }, [activeHabit, goals, habits]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const habitsValidation = Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required(
              "Por favor, insira o título do hábito."
            ),
            description: Yup.string().required(
              "Por favor, insira a descrição do hábito."
            ),
            reward: Yup.string().required(
              "Por favor, insira a recompensa do hábito."
            ),
            goal_id: Yup.number()
              .integer()
              .required("Por favor, o hábito deve pertencer a uma meta."),
            frequency: Yup.array()
              .of(Yup.string())
              .min(1, "Por favor, selecione um dia para frequência.")
              .max(7, "Por favor, limite-se a 7 dias da semana."),
            weekDays: Yup.array().of(
              Yup.object().shape({
                symbol: Yup.string().required(),
                marked: Yup.boolean().required(),
              })
            ),
          })
        )
        .min(1, "É necessário que um hábito seja inserido na meta.");

      habitsValidation
        .validate(habits, { abortEarly: true })
        .then((res) => props.handleHabits(habits))
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
    [habits, props]
  );

  return (
    <Container>
      <h1>Hábitos para a meta</h1>
      <form onSubmit={handleSubmit}>
        {habits.map((habit, indexI) => (
          <fieldset>
            <Input
              name="title"
              label="Título"
              value={habit.title}
              onChange={(e) => handleHabitsInputChange(e, indexI)}
            />
            <Textarea
              name="description"
              label="Descrição"
              value={habit.description}
              onChange={(e) => handleHabitsTextAreaChange(e, indexI)}
            />
            <Textarea
              name="reward"
              label="Recompensa"
              value={habit.reward}
              onChange={(e) => handleHabitsTextAreaChange(e, indexI)}
            />

            <label>Quantitativo</label>
            <input
              type="checkbox"
              name="qualitative"
              checked={habit.qualitative !== 1}
              onChange={(e) => handleHabitsCheckChange(e, indexI)}
            />

            {habit.qualitative !== 1 && (
              <>
                <label>Base</label>
                <input
                  name="base"
                  value={habit.base}
                  onChange={(e) => handleHabitsInputChange(e, indexI)}
                />
              </>
            )}

            <Frequency
              handleWeekDaysChange={(indexJ) =>
                handleWeekDaysChange(indexI, indexJ)
              }
              weekDays={habit.weekDays}
            />
          </fieldset>
        ))}
        <PlusIcon onClick={addHabits} />
        <button>Criar Hábito</button>
      </form>
    </Container>
  );
};

export default HabitsRegister;
