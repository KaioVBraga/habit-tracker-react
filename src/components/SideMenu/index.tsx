import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

import {
  Container,
  GoalItem,
  HabitItem,
  AddButton,
  EditButton,
  CloseButton,
  SetupContainer,
} from "./styles";

import { BsPlusCircle, BsXCircle, BsExclamationCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeGoals } from "../../redux/ducks/goals";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";
import { changeGoalModalState } from "../../redux/ducks/goalModal";
import ModalGoalCreator from "../../components/ModalGoalCreator";
import ModalGoalEditor from "../../components/ModalGoalEditor";

import { getUser } from "../../services/utils";
import swal from "sweetalert";

interface Props {
  className?: string;
}

const SideMenu: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [isModalCreatorOpen, setIsModalCreatorOpen] = useState(false);
  const [isModalEditorOpen, setIsModalEditorOpen] = useState(false);

  const goals = useSelector((state: any) => state.goals);
  const activeHabit = useSelector((state: any) => state.activeHabit);
  const [showHabits, setShowHabits] = useState(true);

  useEffect(() => {
    console.log("DISPATCH");
    api
      .get(`users/${getUser().id}`)
      .then((res) => {
        dispatch(changeGoals(res.data.goals));
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActiveGoal = useCallback(
    (index: number) => {
      const newShowHabits =
        activeHabit.goalIndex === index ? !showHabits : true;

      const newActiveHabit = { goalIndex: index, habitIndex: -1 };
      localStorage.setItem("habit_active", JSON.stringify(newActiveHabit));
      dispatch(changeActiveHabitState(newActiveHabit));
      setShowHabits(newShowHabits);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [activeHabit]
  );

  const handleActiveHabitIndex = useCallback(
    (indexGoal: number, indexHabit: number) => {
      const newActiveHabit = { goalIndex: indexGoal, habitIndex: indexHabit };
      localStorage.setItem("habit_active", JSON.stringify(newActiveHabit));
      dispatch(changeActiveHabitState(newActiveHabit));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const deleteHabit = useCallback(
    (indexGoal: number, indexHabit: number) => {
      swal("Tem certeza que quer deletar este hábito ?").then((res) => {
        if (res) {
          api
            .delete(
              `users/${getUser().id}/goals/${goals[indexGoal].id}/habits/${
                goals[indexGoal].habits[indexHabit].id
              }`
            )
            .then((res) => {
              const newGoals = [...goals];
              const removedHabit = goals[indexGoal].habits[indexHabit];

              newGoals[indexGoal].habits = newGoals[indexGoal].habits.filter(
                (habit: any) => habit.id !== removedHabit.id
              );

              dispatch(changeGoals(newGoals));
            });
        }
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [goals]
  );

  const deleteGoal = useCallback(
    (indexGoal: number) => {
      swal("Tem certeza que quer deletar esta meta ?").then((res) => {
        if (res) {
          api
            .delete(`users/${getUser().id}/goals/${goals[indexGoal].id}`)
            .then((res) => {
              const removedGoal = goals[indexGoal];
              const newGoals = [...goals].filter(
                (goal: any) => goal.id !== removedGoal.id
              );
              handleActiveGoal(indexGoal);
              dispatch(changeGoals(newGoals));
            });
        }
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [goals]
  );

  return (
    <Container>
      <button onClick={() => setIsModalCreatorOpen(true)}>
        Cadastrar Meta
      </button>
      <ul>
        {goals.map((goal: any, indexGoal: number) => {
          const isGoalActive = indexGoal === activeHabit.goalIndex;

          return (
            <GoalItem
              active={isGoalActive}
              goalSelected={activeHabit.habitIndex === -1}
            >
              <span onClick={() => handleActiveGoal(indexGoal)}>
                <p>{goal.title}</p>

                <SetupContainer>
                  <AddButton
                    onClick={() => {
                      dispatch(changeGoalModalState({ screen: "habits" }));
                      setIsModalCreatorOpen(true);
                    }}
                  >
                    <BsPlusCircle />
                  </AddButton>
                  <EditButton
                    onClick={() => {
                      dispatch(changeGoalModalState({ screen: "goal" }));
                      dispatch(
                        changeActiveHabitState({
                          goalIndex: indexGoal,
                          habitIndex: 0,
                        })
                      );
                      setIsModalEditorOpen(true);
                    }}
                  >
                    <BsExclamationCircle />
                  </EditButton>
                  <CloseButton onClick={() => deleteGoal(indexGoal)}>
                    <BsXCircle />
                  </CloseButton>
                </SetupContainer>
              </span>

              <div>
                {isGoalActive &&
                  showHabits &&
                  goal?.habits.map((habit: any, indexHabit: number) => {
                    const isHabitActive =
                      activeHabit.goalIndex === indexGoal &&
                      activeHabit.habitIndex === indexHabit;
                    return (
                      <HabitItem
                        active={isHabitActive}
                        onClick={() =>
                          handleActiveHabitIndex(indexGoal, indexHabit)
                        }
                      >
                        <p>{habit.title}</p>
                        <SetupContainer>
                          <EditButton
                            onClick={() => {
                              dispatch(
                                changeGoalModalState({ screen: "habits" })
                              );
                              dispatch(
                                changeActiveHabitState({
                                  goalIndex: indexGoal,
                                  habitIndex: indexHabit,
                                })
                              );
                              setIsModalEditorOpen(true);
                            }}
                          >
                            <BsExclamationCircle />
                          </EditButton>
                          <CloseButton
                            onClick={() => deleteHabit(indexGoal, indexHabit)}
                          >
                            <BsXCircle />
                          </CloseButton>
                        </SetupContainer>
                      </HabitItem>
                    );
                  })}
              </div>
            </GoalItem>
          );
        })}
      </ul>

      <ModalGoalCreator
        isModalOpen={isModalCreatorOpen}
        setIsModalOpen={setIsModalCreatorOpen}
      />
      <ModalGoalEditor
        isModalOpen={isModalEditorOpen}
        setIsModalOpen={setIsModalEditorOpen}
      />
    </Container>
  );
};

export default SideMenu;
