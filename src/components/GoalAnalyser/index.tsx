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
import { getUser, handleTimezone } from "../../services/utils";
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
  const [goalProgress, setGoalProgress] = useState(null);
  const [bestHabit, setBestHabit] = useState(null);
  const [worstHabit, setWorstHabit] = useState(null);

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
    try {
      console.log("ENTERED");

      if (!goals.length) {
        return;
      }

      const user = getUser();

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

      const newGoalProgress = {
        actualPercentage:
          habitsStatistics.reduce(
            (sum, { actualPercentage }) => sum + actualPercentage,
            0
          ) / habitsStatistics.length,
        totalPercentage:
          habitsStatistics.reduce(
            (sum, { totalPercentage }) => sum + totalPercentage,
            0
          ) / habitsStatistics.length,
      };

      setGoalProgress(newGoalProgress);

      const orderedHabits = [...newGoal.habits];

      const newBestHabit =
        orderedHabits.length > 1
          ? orderedHabits.sort(
              (a, b) =>
                b.statistics.totalPercentage - a.statistics.totalPercentage
            )[0]
          : null;

      const newWorstHabit =
        orderedHabits.length > 1
          ? orderedHabits.sort(
              (a, b) =>
                a.statistics.totalPercentage - b.statistics.totalPercentage
            )[0]
          : null;

      setBestHabit(newBestHabit);
      setWorstHabit(newWorstHabit);
    } catch (err) {
      console.error("ERROR", err);
    }
  }, [goals, activeHabit]);

  useEffect(() => {
    getStatistics();
  }, [goals, activeHabit]);

  if (!goal || !goalProgress) {
    return null;
  }

  return (
    <Container>
      <Header>
        <h1>Overview da Meta:</h1>
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>

        <ProgressContainer>
          {bestHabit && (
            <div>
              Melhor hábito: <strong>{bestHabit.title}</strong>
            </div>
          )}

          {worstHabit && (
            <div>
              Pior hábito: <strong>{worstHabit.title}</strong>
            </div>
          )}

          <label>Dias passados:</label>
          <ProgressBar progress={goalProgress?.actualPercentage || 0} />

          <label>Dias totais:</label>
          <ProgressBar progress={goalProgress?.totalPercentage || 0} />
        </ProgressContainer>
      </Header>

      <HabitsContainer>
        {goal.habits.map((habit, index) => (
          <div>
            <h3 onClick={() => handleActiveGoal(index)}>{habit.title}</h3>
            <p>{habit.description}</p>

            <ProgressContainer>
              <label>Dias passados:</label>
              <ProgressBar
                progress={habit?.statistics?.actualPercentage || 0}
              />

              <label>Dias totais:</label>
              <ProgressBar progress={habit?.statistics?.totalPercentage || 0} />
            </ProgressContainer>
          </div>
        ))}
      </HabitsContainer>
    </Container>
  );
};

export default GoalAnalyser;
