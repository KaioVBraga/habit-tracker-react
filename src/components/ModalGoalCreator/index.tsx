import React, { useState, useCallback } from "react";
import Modal from 'react-modal';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { changeGoals } from "../../redux/ducks/goals";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";

import GoalTypeSelector from '../GoalTypeSelector';
import HabitsRegister from '../HabitsRegister';
import GoalRegister from '../GoalRegister';
import { changeGoalModalState } from "../../redux/ducks/goalModal";


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const ModalGoalCreator: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');

    const goals = useSelector((state: any) => state.goals);
    const goalModal = useSelector((state: any) => state.goalModal);
    const activeHabit = useSelector((state: any) => state.activeHabit);

    const handleHabits = useCallback((habits) => {
        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        api.post(`users/${user.id}/habits`, { habits })
            .then(res => {
                const newGoals = [...goals];

                const formatedHabits = res.data.map((habit: any) => ({ ...habit, marks: [] }))

                newGoals[activeHabit.goalIndex].habits = newGoals[activeHabit.goalIndex].habits.concat(formatedHabits);
                dispatch(changeGoals(newGoals));
                dispatch(changeActiveHabitState({
                    goalIndex: activeHabit.goalIndex,
                    habitIndex: newGoals[activeHabit.goalIndex].habits.length - 1
                }));
            });

        props.setIsModalOpen(false);

        dispatch(changeGoalModalState({ screen: 'category' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goals, activeHabit, props]);

    const handleGoal = useCallback(async (goal) => {

        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        api.post(`users/${user.id}/goals`, { ...goal, type: category, active: 1 })
            .then(res => {
                const newGoals = [...goals];
                newGoals.push(res.data.goals);

                dispatch(changeGoals(newGoals));
                dispatch(changeActiveHabitState({ goalIndex: newGoals.length - 1, habitIndex: 0 }));

                dispatch(changeGoalModalState({ screen: 'habits' }));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, goals]);

    const handleCategory = useCallback((category: string) => {
        setCategory(category);
        dispatch(changeGoalModalState({ screen: 'goal' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                goalModal.screen === 'category' && <GoalTypeSelector handleCategory={handleCategory} />
            }
            {
                goalModal.screen === 'goal' && <GoalRegister handleGoal={handleGoal} />
            }
            {
                goalModal.screen === 'habits' && <HabitsRegister handleHabits={handleHabits} goal_id={goals[goals.length - 1].id} />
            }
        </Modal>
    );
};

export default ModalGoalCreator;
