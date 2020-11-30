import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

import { Container, GoalItem, HabitItem, AddButton, EditButton, CloseButton, SetupContainer } from './styles';

import { BsPlusCircle, BsXCircle, BsExclamationCircle } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { changeGoals } from "../../redux/ducks/goals";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";
import { changeGoalModalState } from "../../redux/ducks/goalModal";
import ModalGoalCreator from "../../components/ModalGoalCreator";
import ModalGoalEditor from "../../components/ModalGoalEditor";

import { getUser } from '../../services/utils';

interface Props {
    className?: string;
}

const SideMenu: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const [isModalCreatorOpen, setIsModalCreatorOpen] = useState(false);
    const [isModalEditorOpen, setIsModalEditorOpen] = useState(false);

    const goals = useSelector((state: any) => state.goals);
    const activeHabit = useSelector((state: any) => state.activeHabit);

    useEffect(() => {
        api
            .get(`users/${getUser().id}`)
            .then(res => {
                dispatch(changeGoals(res.data.goals));
            })
            .catch(err => {
                console.error(err);
            })
    }, [dispatch]);

    const handleActiveGoal = useCallback((index: number) => {
        dispatch(changeActiveHabitState({ goalIndex: index, habitIndex: 0 }));
    }, [dispatch]);

    const handleActiveHabitIndex = useCallback((indexGoal: number, indexHabit: number) => {
        dispatch(changeActiveHabitState({ goalIndex: indexGoal, habitIndex: indexHabit }));
    }, [dispatch]);

    const deleteHabit = useCallback((indexGoal: number, indexHabit: number) => {
        api.delete(`users/${getUser().id}/goals/${goals[indexGoal].id}/habits/${goals[indexGoal].habits[indexHabit].id}`)
            .then(res => {
                const newGoals = [...goals];
                const removedHabit = goals[indexGoal].habits[indexHabit];

                newGoals[indexGoal].habits = newGoals[indexGoal].habits.filter((habit: any) => habit.id !== removedHabit.id)

                dispatch(changeGoals(newGoals));
            })
    }, [dispatch, goals]);

    const deleteGoal = useCallback((indexGoal: number) => {
        api.delete(`users/${getUser().id}/goals/${goals[indexGoal].id}`)
            .then(res => {
                const removedGoal = goals[indexGoal];
                const newGoals = [...goals].filter((goal: any) => goal.id !== removedGoal.id)

                dispatch(changeGoals(newGoals));
            })
    }, [dispatch, goals]);

    return (
        <Container>
            <button onClick={() => setIsModalCreatorOpen(true)}>Cadastrar Meta</button>
            <ul>
                {
                    goals.map((goal: any, indexGoal: number) => {
                        const isGoalActive = indexGoal === activeHabit.goalIndex;

                        return (
                            <GoalItem active={isGoalActive}>
                                <span onClick={() => handleActiveGoal(indexGoal)}>
                                    <p>{goal.title}</p>

                                    <SetupContainer>
                                        <AddButton onClick={() => {
                                            dispatch(changeGoalModalState({ screen: 'habits' }));
                                            setIsModalCreatorOpen(true);
                                        }}>
                                            <BsPlusCircle />
                                        </AddButton>
                                        <EditButton onClick={() => {
                                            dispatch(changeGoalModalState({ screen: 'goal' }));
                                            dispatch(changeActiveHabitState({ goalIndex: indexGoal, habitIndex: 0 }));
                                            setIsModalEditorOpen(true);
                                        }}>
                                            <BsExclamationCircle />
                                        </EditButton>
                                        <CloseButton onClick={() => deleteGoal(indexGoal)}>
                                            <BsXCircle />
                                        </CloseButton>
                                    </SetupContainer>
                                </span>

                                <div>
                                    {
                                        isGoalActive && goal?.habits.map((habit: any, indexHabit: number) => {
                                            const isHabitActive = activeHabit.goalIndex === indexGoal && activeHabit.habitIndex === indexHabit;
                                            return (
                                                <HabitItem
                                                    active={isHabitActive}
                                                    onClick={() => handleActiveHabitIndex(indexGoal, indexHabit)}
                                                >
                                                    <p>{habit.title}</p>
                                                    <SetupContainer>
                                                        <EditButton onClick={() => {
                                                            dispatch(changeGoalModalState({ screen: 'habits' }));
                                                            dispatch(changeActiveHabitState({ goalIndex: indexGoal, habitIndex: indexHabit }));
                                                            setIsModalEditorOpen(true);
                                                        }}>
                                                            <BsExclamationCircle />
                                                        </EditButton>
                                                        <CloseButton onClick={() => deleteHabit(indexGoal, indexHabit)}>
                                                            <BsXCircle />
                                                        </CloseButton>
                                                    </SetupContainer>
                                                </HabitItem>
                                            );
                                        })
                                    }
                                </div>
                            </GoalItem>
                        );
                    })
                }
            </ul>

            <ModalGoalCreator isModalOpen={isModalCreatorOpen} setIsModalOpen={setIsModalCreatorOpen} />
            <ModalGoalEditor isModalOpen={isModalEditorOpen} setIsModalOpen={setIsModalEditorOpen} />
        </Container>
    );
};

export default SideMenu;
