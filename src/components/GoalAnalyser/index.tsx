// @ts-nocheck
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Popup from "reactjs-popup";
// import Modal from 'react-modal';
import { Container, Header, HabitsContainer } from "./styles";
import api from "../../services/api";
import { handleTimezone } from "../../services/utils";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";

interface Props {
  className?: string;
}

const GoalAnalyser: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { activeHabit, goals } = useSelector((state: any) => state);

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

  if (!goals.length) {
    return null;
  }

  return (
    <Container>
      <Header>
        <h1>{goals[activeHabit.goalIndex].title}</h1>
        <p>{goals[activeHabit.goalIndex].description}</p>
      </Header>

      <HabitsContainer>
        {goals[activeHabit.goalIndex].habits.map((habit, index) => (
          <div>
            <h2 onClick={() => handleActiveGoal(index)}>{habit.title}</h2>
            <p>{habit.description}</p>
          </div>
        ))}
      </HabitsContainer>
    </Container>
  );
};

export default GoalAnalyser;
