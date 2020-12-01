import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Input from "../Input";
import Textarea from '../Textarea';
import Deadend from '../Deadend';
import { Container } from "./styles";
import { useSelector } from "react-redux";
import api from '../../services/api';

import { getUser } from '../../services/utils';

interface Goal {
    [key: string]: string;
}
interface Props {
    handleGoal(goal: any): void;
}

const GoalRegister: React.FC<Props> = props => {
    const [goal, setGoal] = useState<Goal>({
        title: '',
        description: '',
        reward: '',
        limitDate: ''
    });

    const goals = useSelector((state: any) => state.goals);
    const activeHabit = useSelector((state: any) => state.activeHabit);

    useEffect(() => {
        api
            .get(`/users/${getUser().id}/goals/${goals[activeHabit.goalIndex].id}`)
            .then(res => {
                const { title, reward, description, deadends } = res.data;
                const limitDate = deadends.pop().limit.split('T')[0];
                setGoal({ title, reward, description, limitDate });
            });
    }, [goals, activeHabit]);


    const handleGoalChange = useCallback((e: FormEvent) => {
        const newGoal = { ...goal };
        newGoal[(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value;
        setGoal(newGoal);
    }, [goal]);

    const handleDeadendChange = useCallback((e: FormEvent) => {
        const newGoal = { ...goal };
        newGoal.limitDate = (e.target as HTMLInputElement).value;
        setGoal(newGoal);
    }, [goal]);

    return (
        <Container>
            <h1>
                Defina sua metaa
            </h1>
            <form onSubmit={e => {
                e.preventDefault();
                props.handleGoal(goal);
            }}>
                <Input
                    name="title"
                    label="Título"
                    value={goal.title}
                    onChange={handleGoalChange}
                />
                <Textarea
                    name="description"
                    label="Descrição"
                    value={goal.description}
                    onChange={handleGoalChange}
                />
                <Textarea
                    name="reward"
                    label="Recompensa"
                    value={goal.reward}
                    onChange={handleGoalChange}
                />

                <Deadend
                    value={goal.limitDate}
                    onChange={handleDeadendChange}
                />

                <button>
                    Editar meta
                </button>
            </form>
        </Container >
    );
};

export default GoalRegister;
