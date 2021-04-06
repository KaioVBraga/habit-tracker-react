// @ts-nocheck
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Popup from "reactjs-popup";
// import Modal from 'react-modal';
import {
  Container,
  GoalContainer,
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
  const [allGoals, setAllGoals] = useState(null);
  const [goalProgress, setGoalProgress] = useState(null);
  const [bestHabit, setBestHabit] = useState(null);
  const [worstHabit, setWorstHabit] = useState(null);

  console.log("GOALS", goals);
  console.log("ACTIVE HABIT", activeHabit);

  const handleActiveGoal = useCallback(
    (index: number) => {
      const newActiveHabit = {
        goalIndex: index,
        habitIndex: -1,
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

      const newAllGoals = await Promise.all(
        goals.map(async (goal) => {
          const habitsStatistics = await Promise.all(
            goal.habits.map(async (habit) => {
              return api
                .get(
                  `/users/${user.id}/goals/${habit.goal_id}/habits/${habit.id}/statistics`
                )
                .then((res) => {
                  return res.data;
                });
            })
          );

          const statistics = {
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

          return { ...goal, statistics };
        })
      );

      setAllGoals(newAllGoals);
    } catch (err) {
      console.error("ERROR", err);
    }
  }, [goals, activeHabit]);

  useEffect(() => {
    getStatistics();
  }, [goals, activeHabit]);

  if (!allGoals) {
    return null;
  }

  return (
    <Container>
      <h1>Overview de metas</h1>
      {allGoals.map((goal, index) => (
        <GoalContainer>
          <h2 onClick={() => handleActiveGoal(index)}>{goal.title}</h2>
          <p>{goal.description}</p>

          <ProgressContainer>
            <label>Dias passados:</label>
            <ProgressBar progress={goal?.statistics?.actualPercentage || 0} />

            <label>Dias totais:</label>
            <ProgressBar progress={goal?.statistics?.totalPercentage || 0} />
          </ProgressContainer>
        </GoalContainer>
      ))}
    </Container>
  );
};

export default GoalAnalyser;
