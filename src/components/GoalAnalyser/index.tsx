// @ts-nocheck
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Popup from "reactjs-popup";
// import Modal from 'react-modal';
import {
  Container,
  Header,
  HabitsContainer,
  ProgressContainer,
} from "./styles";
import api from "../../services/api";
import { handleTimezone } from "../../services/utils";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";
import ProgressBar from "../ProgressBar";

interface Props {
  className?: string;
}

const GoalAnalyser: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { activeHabit, goals } = useSelector((state: any) => state);
  const [goal, setGoal] = useState(null);

  console.log("GOALS", goals);
  console.log("ACTIVE HABIT", activeHabit);

  const handleActiveGoal = useCallback(
    (index: number) => {
      const newActiveHabit = {
        goalIndex: activeHabit.goalIndex,
        habitIndex: index,
      };
      localStorage.setItem("habit_active", JSON.stringify(newActiveHabit));
      dispatch(changeActiveHabitState(newActiveHabit));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [activeHabit]
  );

  const getStatistics = useCallback(async () => {
    console.log("ENTERED");

    if (!goals.length) {
      return;
    }

    const userString = localStorage.getItem("habit_user") || "";
    const user = JSON.parse(userString);

    const habitsStatistics = await Promise.all(
      goals[activeHabit.goalIndex].habits.map(async (habit) => {
        return api
          .get(
            `/users/${user.id}/goals/${habit.goal_id}/habits/${habit.id}/statistics`
          )
          .then((res) => {
            return res.data;
          });
      })
    );

    const newGoal = { ...goals[activeHabit.goalIndex] };

    newGoal.habits = newGoal.habits.map((habit, index) => {
      return { ...habit, statistics: habitsStatistics[index] };
    });

    setGoal(newGoal);

    console.log("GOAAAL", newGoal);
  }, [goals, activeHabit]);

  useEffect(() => {
    getStatistics();
  }, [goals, activeHabit]);

  if (!goal) {
    return null;
  }

  return (
    <Container>
      <Header>
        <h1>{goal.title}</h1>
        <p>{goal.description}</p>
      </Header>

      <HabitsContainer>
        {goal.habits.map((habit, index) => (
          <div>
            <h2 onClick={() => handleActiveGoal(index)}>{habit.title}</h2>
            <p>{habit.description}</p>

            <ProgressContainer>
              <label>Dias passados:</label>
              <ProgressBar progress={habit.statistics.actualPercentage} />

              <label>Dias totais:</label>
              <ProgressBar progress={habit.statistics.totalPercentage} />
            </ProgressContainer>
          </div>
        ))}
      </HabitsContainer>
    </Container>
  );
};

export default GoalAnalyser;
