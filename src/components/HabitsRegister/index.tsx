import React, { useEffect, useState, useCallback, FormEvent } from "react";  
import Input from "../Input";
import Textarea from '../Textarea';
import { Container, PlusIcon } from "./styles";


interface Props {
    handleGoal(goal:string): void;
}

interface Habit {
    [key:string]: string;
}

const HabitsRegister: React.FC<Props> = props => {
    const [habits, setHabits] = useState<Array<Habit>>([
        {
            title: '',
            description: '',
            reward: ''
        }
    ]);

    const handleHabitsTextAreaChange = useCallback((e: FormEvent, index:number) => {
        const newHabits = [...habits];
        newHabits[index][(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value;
        setHabits(newHabits);
    }, [habits]);

    const handleHabitsInputChange = useCallback((e: FormEvent, index:number) => {
        const newHabits = [...habits];
        newHabits[index][(e.target as HTMLTextAreaElement).name] = (e.target as HTMLTextAreaElement).value;
        setHabits(newHabits);
    }, [habits]);

    const addHabits = useCallback(() => {
        const newHabits = [...habits];
        newHabits.push(
            {
                title: '',
                description: '',
                reward: ''
            }
        );
        setHabits(newHabits);
    }, [habits]);

    return(
        <Container>
            <h1>
                Hábitos para a meta
            </h1>
            <form>
                {
                    habits.map((habit, index) => 
                        <fieldset>
                            <Input
                                name="title"
                                label="Título"
                                value={habit.title}
                                onChange={e => handleHabitsInputChange(e, index)}
                            />
                            <Textarea 
                                name="description"
                                label="Descrição"
                                value={habit.description}
                                onChange={e => handleHabitsTextAreaChange(e, index)}
                            />
                            <Textarea 
                                name="reward"
                                label="Recompensa"
                                value={habit.reward}
                                onChange={e => handleHabitsTextAreaChange(e, index)}
                            />
                        </fieldset>
                    )
                }
                <PlusIcon onClick={addHabits} />
                <button>
                    Criar Hábito
                </button>
            </form>
        </Container>
    );
};

export default HabitsRegister;
