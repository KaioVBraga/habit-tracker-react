import React, { useEffect, useState, useCallback, FormEvent } from "react";  
import Input from "../Input";
import Textarea from '../Textarea';
import { Container } from "./styles";

interface Goal {
    [key:string]: string;
}
interface Props {
    handleGoal(goal:Goal): void;
}

const GoalRegister: React.FC<Props> = props => {
    const [goal, setGoal] = useState<Goal>({
        title: '',
        description: '',
        reward: ''
    });

    const handleGoalChange = useCallback((e:FormEvent) => {
        const newGoal = {...goal};
        newGoal[(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value;
        setGoal(newGoal);
    }, [goal]);

    return(
        <Container>
            <h1>
                Defina sua meta
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

                <button>
                    Criar meta
                </button>
            </form>
        </Container>
    );
};

export default GoalRegister;
