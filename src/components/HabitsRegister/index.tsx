import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Input from "../Input";
import Textarea from '../Textarea';
import Frequency from '../Frequency';
import { Container, PlusIcon } from "./styles";


interface Props {
    handleHabits(habits: { [key: string]: any }): void;
    goal_id: number;
}

// interface Habit {
//     [key: string]: string | number[];
// }

interface Habit {
    [key: string]: any;
}

const HabitsRegister: React.FC<Props> = props => {
    const [habits, setHabits] = useState<Array<Habit>>([
        {
            title: '',
            description: '',
            reward: '',
            frequency: [],
            qualitative: false,
            base: 0,
            weekDays: [
                { symbol: 'D', marked: false },
                { symbol: 'S', marked: false },
                { symbol: 'T', marked: false },
                { symbol: 'Q', marked: false },
                { symbol: 'Q', marked: false },
                { symbol: 'S', marked: false },
                { symbol: 'S', marked: false }
            ],
            goal_id: props.goal_id
        }
    ]);

    const handleWeekDaysChange = useCallback((indexI, indexJ) => {
        const newHabits = [...habits];
        newHabits[indexI].weekDays[indexJ].marked = !newHabits[indexI].weekDays[indexJ].marked;
        newHabits[indexI].frequency = newHabits[indexI].weekDays
            .map((day: { symbol: string, marked: boolean }, index: number) => day.marked ? index : -1)
            .filter((index: number) => index > -1);
        setHabits(newHabits);
    }, [habits]);

    const handleHabitsTextAreaChange = useCallback((e: FormEvent, index: number) => {
        const newHabits = [...habits];
        newHabits[index][(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value;
        setHabits(newHabits);
    }, [habits]);

    const handleHabitsInputChange = useCallback((e: FormEvent, index: number) => {
        const newHabits = [...habits];
        newHabits[index][(e.target as HTMLTextAreaElement).name] = (e.target as HTMLTextAreaElement).value;
        setHabits(newHabits);
    }, [habits]);

    const handleHabitsCheckChange = useCallback((e: FormEvent, index: number) => {
        const newHabits = [...habits];
        newHabits[index][(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).checked ? 1 : 0;
        setHabits(newHabits);
    }, [habits]);

    const addHabits = useCallback(() => {
        const newHabits = [...habits];
        newHabits.push(
            {
                title: '',
                description: '',
                reward: '',
                weekDays: [
                    { symbol: 'D', marked: false },
                    { symbol: 'S', marked: false },
                    { symbol: 'T', marked: false },
                    { symbol: 'Q', marked: false },
                    { symbol: 'Q', marked: false },
                    { symbol: 'S', marked: false },
                    { symbol: 'S', marked: false }
                ],
                goal_id: props.goal_id
            }
        );
        setHabits(newHabits);
    }, [habits, props.goal_id]);

    return (
        <Container>
            <h1>
                Hábitos para a meta
            </h1>
            <form onSubmit={() => props.handleHabits(habits)}>
                {
                    habits.map((habit, indexI) =>
                        <fieldset>
                            <Input
                                name="title"
                                label="Título"
                                value={habit.title}
                                onChange={e => handleHabitsInputChange(e, indexI)}
                            />
                            <Textarea
                                name="description"
                                label="Descrição"
                                value={habit.description}
                                onChange={e => handleHabitsTextAreaChange(e, indexI)}
                            />
                            <Textarea
                                name="reward"
                                label="Recompensa"
                                value={habit.reward}
                                onChange={e => handleHabitsTextAreaChange(e, indexI)}
                            />

                            <label>
                                Qualitativo
                            </label>
                            <input type="checkbox" name="qualitative" checked={habit.qualitative === 1} onChange={e => handleHabitsCheckChange(e, indexI)} />

                            <label>
                                Base
                            </label>
                            <input
                                name="base"
                                value={habit.base}
                                onChange={e => handleHabitsInputChange(e, indexI)}
                            />

                            <Frequency
                                handleWeekDaysChange={indexJ => handleWeekDaysChange(indexI, indexJ)}
                                weekDays={habit.weekDays}
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
