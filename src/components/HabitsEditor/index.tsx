import React, { useState, useCallback, useEffect, FormEvent } from "react";
import Input from "../Input";
import Textarea from '../Textarea';
import Frequency from '../Frequency';
import { Container } from "./styles";
import { useSelector } from "react-redux";


interface Props {
    handleHabit(habit: { [key: string]: any }): void;
}

// interface Habit {
//     [key: string]: string | number[];
// }

interface Habit {
    [key: string]: any;
}

const HabitsRegister: React.FC<Props> = props => {
    const { goals, activeHabit } = useSelector((state: any) => ({ goals: state.goals, activeHabit: state.activeHabit }));

    const [habit, setHabit] = useState<Habit>({});

    useEffect(() => {
        const newHabit = goals[activeHabit.goalIndex].habits[activeHabit.habitIndex];

        console.log('newHabit', newHabit);

        const weekSymbols = [
            'D',
            'S',
            'T',
            'Q',
            'Q',
            'S',
            'S'
        ];

        newHabit.weekDays = weekSymbols.map((symbol, index) => ({ symbol, marked: newHabit.frequency.includes(index) }));

        setHabit(newHabit);
    }, [goals, activeHabit]);

    const handleWeekDaysChange = useCallback((index) => {
        const newHabit = { ...habit };
        newHabit.weekDays[index].marked = !newHabit.weekDays[index].marked;
        newHabit.frequency = newHabit.weekDays
            .map((day: { symbol: string, marked: boolean }, index: number) => day.marked ? index : -1)
            .filter((index: number) => index > -1);
        setHabit(newHabit);
    }, [habit]);

    const handleHabitsTextAreaChange = useCallback((e: FormEvent) => {
        const newHabit = { ...habit };
        newHabit[(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value;
        setHabit(newHabit);
    }, [habit]);

    const handleHabitsInputChange = useCallback((e: FormEvent) => {
        const newHabit = { ...habit };
        newHabit[(e.target as HTMLTextAreaElement).name] = (e.target as HTMLTextAreaElement).value;
        setHabit(newHabit);
    }, [habit]);

    const handleHabitsCheckChange = useCallback((e: FormEvent) => {
        const { name } = (e.target as HTMLInputElement);
        const newHabit = { ...habit };

        newHabit[name] = newHabit[name] === 1 ? 0 : 1;

        setHabit(newHabit);

    }, [habit]);

    return (
        <Container>
            <h1>
                Hábitos para a meta
            </h1>
            <form onSubmit={() => props.handleHabit(habit)}>

                <fieldset>
                    <Input
                        name="title"
                        label="Título"
                        value={habit.title}
                        onChange={handleHabitsInputChange}
                    />
                    <Textarea
                        name="description"
                        label="Descrição"
                        value={habit.description}
                        onChange={handleHabitsTextAreaChange}
                    />
                    <Textarea
                        name="reward"
                        label="Recompensa"
                        value={habit.reward}
                        onChange={handleHabitsTextAreaChange}
                    />

                    <label>Quantitativo</label>
                    <input type="checkbox" name="qualitative" checked={habit.qualitative !== 1} onChange={handleHabitsCheckChange} />

                    {
                        habit.qualitative !== 1 && <>
                            <label>Base</label>
                            <input
                                name="base"
                                value={habit.base}
                                onChange={handleHabitsInputChange}
                            />
                        </>
                    }

                    <Frequency
                        handleWeekDaysChange={index => handleWeekDaysChange(index)}
                        weekDays={habit.weekDays}
                    />
                    <button>
                        Editar meta
                    </button>
                </fieldset>
            </form>
        </Container>
    );
};

export default HabitsRegister;
