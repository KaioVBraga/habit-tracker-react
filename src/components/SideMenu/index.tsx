import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

import { Container, GoalItem, HabitItem } from './styles';

import { BsPlusCircle } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { changeGoals } from "../../redux/ducks/goals";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";
import { changeGoalModalState } from "../../redux/ducks/goalModal";
import ModalGoalCreator from "../../components/ModalGoalCreator";

import { getUser } from '../../services/utils';

interface Props {
    className?: string;
}

const SideMenu: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <Container>
            <button onClick={() => setIsModalOpen(true)}>Cadastrar Meta</button>
            <ul>
                {
                    goals.map((goal: any, indexGoal: number) => {
                        const isGoalActive = indexGoal === activeHabit.goalIndex;

                        return (
                            <GoalItem active={isGoalActive}>
                                <span onClick={() => handleActiveGoal(indexGoal)}>
                                    <p>{goal.title}</p>
                                    <BsPlusCircle
                                        style={{
                                            fontSize: '20px',
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px'
                                        }}
                                        onClick={() => {
                                            dispatch(changeGoalModalState({ screen: 'habits' }))
                                            setIsModalOpen(true);
                                        }}
                                    />
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
                                                    {habit.title}
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

            <ModalGoalCreator isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Container>
    );
};

export default SideMenu;
