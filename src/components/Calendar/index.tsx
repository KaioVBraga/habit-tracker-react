// @ts-nocheck
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import {
  Container,
  CalendarContainer,
  IconLeft,
  IconRight,
  Tooltip,
} from "./styles";
import api from "../../services/api";
import { getUser, handleTimezone } from "../../services/utils";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";
import { changeGoals } from "../../redux/ducks/goals";

import CalendarItem from "../CalendarItem";
import Deadend from "../Deadend";

interface Props {
  className?: string;
}

const Calendar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(Array(35).fill(0));
  const months = [
    { name: "Janeiro", count: 31 },
    { name: "Fevereiro", count: 28 },
    { name: "Março", count: 31 },
    { name: "Abril", count: 30 },
    { name: "Maio", count: 31 },
    { name: "Junho", count: 30 },
    { name: "Julho", count: 31 },
    { name: "Agosto", count: 31 },
    { name: "Setembro", count: 30 },
    { name: "Outubro", count: 31 },
    { name: "Novembro", count: 30 },
    { name: "Dezembro", count: 31 },
  ];
  const [date, setDate] = useState(new Date());
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth());
  const [markationValue, setMarkationValue] = useState(1);
  const [deadends, setDeadends] = useState(null);
  const [habit, setHabit] = useState(null);

  const [newDeadend, setNewDeadend] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finished, setFinished] = useState("");
  const [continueGoal, setContinueGoal] = [...useState("")];

  const { activeHabit, goals } = useSelector((state: any) => state);

  const finishGoal = useCallback(
    (finished) => {
      const goal = goals[activeHabit?.goalIndex || 0];

      api
        .put(`/goals/${goal.id}/finish`, {
          accomplished: finished === "yes" ? 1 : 0,
        })
        .then((res) => {
          setIsModalOpen(false);
        });
    },
    [activeHabit, goals]
  );

  const monthSum = (someDate: Date, value: number) => {
    const newDate = new Date(someDate);
    const [, month] = handleTimezone(newDate).brasil.split("/");

    const opMonth = month - 1;

    return (12 + opMonth + (value % 12)) % 12;
  };

  const handleDeadendChange = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setNewDeadend(value);
  };

  const continueGoalCallback = useCallback(() => {
    if (!newDeadend) {
      return;
    }

    const goal = goals[activeHabit?.goalIndex || 0];

    const userString = localStorage.getItem("habit_user") || "";
    const user = JSON.parse(userString);

    const gambiarraDate = handleTimezone(newDeadend).date;

    gambiarraDate.setDate(gambiarraDate.getDate() + 1);

    api
      .post(`/users/${user.id}/goals/${goal.id}/deadends`, {
        accomplished: null,
        limit: gambiarraDate.toISOString(),
      })
      .then((res) => {
        api
          .get(`users/${getUser().id}`)
          .then((res) => {
            dispatch(changeGoals(res.data.goals));
            setIsModalOpen(false);
          })
          .catch((err) => {
            setIsModalOpen(false);
          });
      });
  }, [activeHabit, goals, newDeadend]);

  useEffect(() => {
    try {
      const goalIndex = activeHabit?.goalIndex;
      const habitIndex = activeHabit?.habitIndex;

      if (!goals.length || goalIndex === null || habitIndex === null) {
        setHabit(null);
        setDeadends(null);
        return;
      }

      const goal = goals[goalIndex];
      const newHabit = goal.habits[habitIndex];
      const newDeadends = goal.deadends;

      setHabit(newHabit);
      setDeadends(newDeadends);
    } catch (err) {
      localStorage.getItem(JSON.stringify({ goalIndex: 0, habitIndex: 0 }));
      dispatch(changeActiveHabitState({ goalIndex: 0, habitIndex: 0 }));
    }
  }, [activeHabit, deadends, dispatch, goals]);

  useEffect(() => {
    // console.log("habit", habit);
    if (habit) {
      // console.log("LOOP DATE");

      const doubleDigit = (num: number) => {
        return `${num < 10 ? "0" + num : num}`;
      };

      // @ts-ignore
      const markedDays = habit.marks.map((mark: any) => ({
        date: handleTimezone(mark.createdAt).brasil,
        markation: mark.markation,
      }));

      const setPosition = (
        position: number,
        month: number,
        inMonth: boolean
      ) => {
        const localeDate = `${doubleDigit(month)}/${doubleDigit(position)}/${
          monthSum(actualCalendar, -1) === 11
            ? actualCalendar.getFullYear() - 1
            : actualCalendar.getFullYear()
        }`;

        const mark =
          markedDays.length > 0
            ? markedDays.find(
                (mark: any) =>
                  mark.date === handleTimezone(new Date(localeDate)).brasil
              ) || {
                markation: 0,
              }
            : { markation: 0 };

        return {
          position,
          value: mark.markation,
          inMonth,
          date: new Date(localeDate),
        };
      };

      const actualCalendar = date;
      const firstOfMonth =
        actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 1 > 0
          ? actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 1
          : actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 7 + 1;

      const previousMonth = Array(months[monthSum(actualCalendar, -1)].count)
        .fill(null)
        .map((something, index) => index + 1)
        .map((position: number) =>
          setPosition(position, monthSum(actualCalendar, -1) + 1, false)
        );
      const actualMonth = Array(months[monthSum(actualCalendar, 0)].count)
        .fill(null)
        .map((something, index) => index + 1)
        .map((position: number) =>
          setPosition(position, monthSum(actualCalendar, 0) + 1, true)
        );
      const postMonth = Array(months[monthSum(actualCalendar, 1)].count)
        .fill(null)
        .map((something, index) => index + 1)
        .map((position: number) =>
          setPosition(position, monthSum(actualCalendar, 1) + 1, false)
        );

      const previousMonthStart = previousMonth.length - firstOfMonth;
      const previousMonthEnd = firstOfMonth % 7 && previousMonth.length;
      const previousMonthSlice = previousMonth.slice(
        previousMonthStart,
        previousMonthEnd
      );

      const postMonthStart = 0;
      const postMonthSliceEnd =
        42 - (actualMonth.length + previousMonthSlice.length);
      const postMonthSlice = postMonth.slice(postMonthStart, postMonthSliceEnd);

      const allDays = previousMonthSlice
        .concat(actualMonth)
        .concat(postMonthSlice);

      setDays(allDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, monthNumber, habit, activeHabit]);

  const handleDays = useCallback(
    (
      index: number,
      isToday: boolean,
      inGoal: boolean,
      inFrequency: boolean,
      markation: number,
      isDeadend: boolean
    ) => {
      const newDays = [...days];

      // if (isDeadend) {
      //     setIsModalOpen(true);
      // }

      if (
        isToday &&
        inGoal &&
        inFrequency &&
        newDays[index].value !== markation
      ) {
        const userString = localStorage.getItem("habit_user") || "";
        const user = JSON.parse(userString);

        // console.log("MARK USER", user);
        // console.log("MARK HABIT", habit);

        api
          .post(
            `/users/${user.id}/goals/${habit.goal_id}/habits/${habit.id}/marks`,
            { markation }
          )
          .then((res) => {
            swal(
              "Parabéns",
              `Aproveite sua recompensa da prática do seu hábito: ${habit.reward}`,
              "success"
            );

            const newMarks = [...habit.marks];

            newDays[index].value = markation;
            setDays(newDays);
            setHabit((habit) => ({
              ...habit,
              marks: [...newMarks, res.data],
            }));

            const goalIndex = activeHabit?.goalIndex;
            const habitIndex = activeHabit?.habitIndex;

            if (goals.length && goalIndex !== null && habitIndex !== null) {
              const newGoals = [...goals];

              newGoals[goalIndex].habits[habitIndex].marks.push(res.data);

              dispatch(changeGoals(newGoals));
            }

            if (isToday && inGoal && isDeadend) {
              setIsModalOpen(true);
            }
          })
          .catch((err) => {
            console.error(err);
            swal(
              "Ops",
              `Ocorreu um erro ao salvar a marcação de seu hábito, por favor, tente mais tarde.`,
              "error"
            );
          });
      }
    },
    [days, habit, activeHabit]
  );

  const handleMarkationValueChange = useCallback(
    (e: FormEvent) => {
      if (habit?.base) {
        const value = Number((e.target as HTMLInputElement).value);

        if (value < 0) {
          setMarkationValue(0);
          return;
        }

        if (value > habit.base) {
          setMarkationValue(habit.base);
          return;
        }

        setMarkationValue(value);
      }
    },
    [habit]
  );

  const handleClosePopup = useCallback(
    (index: number, isDeadend) => {
      handleDays(index, true, true, markationValue, isDeadend);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [handleDays, markationValue]
  );

  const changeMonthNumber = useCallback(
    (value) => {
      const newDate = date;
      newDate.setMonth(newDate.getMonth() + value);
      setDate(newDate);
      setMonthNumber(newDate.getMonth());
    },
    [date]
  );

  useEffect(() => {
    if (!deadends || !deadends.length) {
      return;
    }

    const lastDeadend = [...deadends].pop();

    const cleanToday = handleTimezone(new Date());

    const cleanLastDeadend = handleTimezone(new Date(lastDeadend.limit));

    if (cleanToday.date.valueOf() < cleanLastDeadend.date.valueOf()) {
      return;
    }

    if (lastDeadend.accomplished === null) {
      setIsModalOpen(true);
    }
  }, [deadends]);

  if (!habit || !deadends) {
    return null;
  }

  return (
    <Container className={props.className}>
      <IconLeft onClick={() => changeMonthNumber(-1)} />
      <section>
        <h1>{habit.title}</h1>
        <h2>
          {months[monthNumber].name} {date.getFullYear()}
        </h2>
        <ul>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <CalendarContainer>
          {days.map((day, index) => {
            const cleanHabitDate = handleTimezone(new Date(habit.createdAt));
            const cleanDate = handleTimezone(new Date(day.date));
            const cleanToday = handleTimezone(new Date());

            const isToday = cleanToday.brasil === cleanDate.brasil;

            const lastDeadend = [...deadends]
              ?.map((deadend: any) => {
                return handleTimezone(new Date(deadend.limit));
              })
              ?.pop();

            if (!lastDeadend) {
              return null;
            }

            const inGoal =
              cleanHabitDate.date.valueOf() <= cleanDate.date.valueOf() &&
              cleanDate.date.valueOf() <= cleanToday.date.valueOf() &&
              cleanDate.date.valueOf() <= lastDeadend.date.valueOf();

            const isDeadend = !!deadends
              .map(
                (deadend: any) => handleTimezone(new Date(deadend.limit)).brasil
              )
              .find((deadend: any) => {
                return deadend === cleanDate.brasil;
              });

            const inFrequency = habit.frequency.includes(index % 7);

            return (
              <CalendarItem
                habit={habit}
                day={day}
                deadends={deadends}
                handleClosePopup={() => handleClosePopup(index, isDeadend)}
                handleMarkationValueChange={handleMarkationValueChange}
                handleDays={() => {
                  handleDays(index, isToday, inGoal, inFrequency, 1, isDeadend);
                }}
                inGoal={inGoal}
                inFrequency={inFrequency}
                markationValue={markationValue}
                beforeDeadend={
                  cleanDate.date.valueOf() <= lastDeadend.date.valueOf()
                }
              />
            );
          })}
        </CalendarContainer>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,.87)",
            },
            content: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {finished === "" && continueGoal === "" && (
            <>
              <h1>Você finalizou seu desafio !</h1>
              <p style={{ marginTop: "10px" }}>Conseguiu atingir sua meta ?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "400px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => finishGoal("yes")}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Sim
                </button>
                <button
                  onClick={() => setFinished("no")}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Não
                </button>
              </div>
            </>
          )}

          {finished === "yes" && continueGoal === "" && (
            <>
              <p>Parabéns, curta sua recompensa</p>
            </>
          )}

          {finished === "no" && continueGoal === "" && (
            <>
              <p>Deseja, prolongar sua meta ?</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "400px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setContinueGoal("yes")}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Sim
                </button>
                <button
                  onClick={() => finishGoal("no")}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Não
                </button>
              </div>
            </>
          )}

          {finished === "no" && continueGoal === "yes" && (
            <>
              <p>Escolha uma nova data de limite</p>

              <Deadend value={newDeadend} onChange={handleDeadendChange} />
              <button onClick={continueGoalCallback}>Enviar</button>
            </>
          )}
        </Modal>
      </section>
      <IconRight onClick={() => changeMonthNumber(1)} />
    </Container>
  );
};

export default Calendar;
