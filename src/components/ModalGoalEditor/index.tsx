import React, { useState, useCallback } from "react";
import Modal from 'react-modal';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { changeGoals } from "../../redux/ducks/goals";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";

import HabitsEditor from '../HabitsEditor';
import GoalEditor from '../GoalEditor';
import { changeGoalModalState } from "../../redux/ducks/goalModal";


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const ModalGoalEditor: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');

    const goals = useSelector((state: any) => state.goals);
    const goalModal = useSelector((state: any) => state.goalModal);
    const activeHabit = useSelector((state: any) => state.activeHabit);

    const handleHabit = useCallback((habit) => {
        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        console.log("habit", habit);

        const goalId = goals[activeHabit.goalIndex].id;
        const habitId = goals[activeHabit.goalIndex].habits[activeHabit.habitIndex].id;

        api.put(`users/${user.id}/goals/${goalId}/habits/${habitId}`, habit)
            .then(res => {
                const newGoals = [...goals];
                newGoals[activeHabit.goalIndex].habits[activeHabit.habitIndex] = res.data;

                console.log("res data", res.data);

                console.log("NEW GOALS", newGoals);

                dispatch(changeGoals(newGoals));
            });

        props.setIsModalOpen(false);
    }, [activeHabit.goalIndex, activeHabit.habitIndex, dispatch, goals, props]);

    const handleGoal = useCallback((goal) => {
        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        api.put(`users/${user.id}/goals/${goals[activeHabit.goalIndex].id}`, { ...goal })
            .then(res => {
                const newGoals = [...goals];
                newGoals[activeHabit.goalIndex] = res.data;
                dispatch(changeGoals(newGoals));
            });

        props.setIsModalOpen(false);
    }, [activeHabit.goalIndex, dispatch, goals, props]);

    return (
        <Modal
            isOpen={props.isModalOpen}
            onRequestClose={() => props.setIsModalOpen(false)}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,.87)'
                },
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            }}
        >
            {
                goalModal.screen === 'goal' && <GoalEditor handleGoal={handleGoal} />
            }
            {
                goalModal.screen === 'habits' && <HabitsEditor handleHabit={handleHabit} />
            }
        </Modal>
    );
};

export default ModalGoalEditor;
