import React, { useState, useEffect, useCallback } from "react";
import Modal from 'react-modal';
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";
import Calendar from '../../components/Calendar';
import GoalTypeSelector from '../../components/GoalTypeSelector';
import GoalRegister from '../../components/GoalRegister';
import HabitsRegister from '../../components/HabitsRegister';
import { Container, GoalItem, HabitItem } from './styles';
import Statistics from "../../components/Statistics";

interface Goal {
    id: number,
    title: String,
    type: String,
    active: Number,
    description: String,
    user_id: Number,
    reward: String,
    createdAt: String,
    updatedAt: String,
    deadends: {
        id: number;
        limit: string;
        accomplished: boolean | null;
        goal_id: number;
        createdAt: string;
        udpatedAt: string;
    }[]
};

interface Goals extends Array<Goal> { };

const Profile: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [goals, setGoals] = useState<Goals>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerPhase, setRegisterPhase] = useState('category');
    const [category, setCategory] = useState('');
    const [goal, setGoal] = useState({});
    const [activeGoalIndex, setActiveGoalIndex] = useState(0);
    const [activeGoalHabits, setActiveGoalHabits] = useState([]);
    const [activeGoalHabitsIndex, setActiveGoalHabitsIndex] = useState(0);

    useEffect(() => {
        const getProfile = async (id: Number) => {
            try {
                const response = await api.get(`users/${id}`);

                console.log('GOALS', response.data.goals);

                setGoals(response.data.goals);

                api.get(`/users/${user.id}/goals/${response.data.goals[0].id}/habits`).then(res => {
                    setActiveGoalHabits(res.data);
                    console.log(res.data);
                }).catch(err => {
                    setActiveGoalHabits([]);
                    console.log(err);
                });
            } catch (err) {
                console.log(err);
            }
        }

        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        setName(user.name);
        setEmail(user.email);

        getProfile(user.id);
    }, []);

    const handleCategory = useCallback((category: string) => {
        setCategory(category);
        setRegisterPhase('goal');
    }, []);

    const handleGoal = useCallback(async (goal) => {

        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        await api.post(`users/${user.id}/goals`, { ...goal, type: category, active: 1 })
            .then(res => {
                const newGoals = [...goals];
                newGoals.push(res.data);
                setGoals(newGoals);
            });

        setGoal({ ...goal, type: category, active: 1 });
        setRegisterPhase('habits');
    }, [category, goals]);

    const handleHabits = useCallback(async (habits) => {

        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user);

        console.log(habits);

        api.post(`users/${user.id}/habits`, { habits })
            .then(res => {
                // const newGoals = [...goals];
                // newGoals.push(res.data);
                // set(newGoals);

                console.log(res);


            });

        // console.log(response.data);

        // setGoal({ ...goal, type: category, active: 1 });
        setIsModalOpen(false);
        setRegisterPhase('category');
    }, []);

    const scrollTo = (className: string) => {
        const scrollY = window?.scrollY;
        const classRectTop = document?.querySelector(className)?.getBoundingClientRect()?.top || 0;

        const y = classRectTop + scrollY;

        window.scroll({
            top: y - 100,
            behavior: 'smooth'
        });
    }

    const handleActiveGoal = useCallback((index:number) => {
        console.log('HANDLE ACTIVE GOAL');

        const userString = localStorage.getItem('habit_user') || '';
        const user = JSON.parse(userString);

        api.get(`/users/${user.id}/goals/${goals[index].id}/habits`).then(res => {
            setActiveGoalHabits(res.data);
            console.log('ACTIVE GOAL HABITS',res.data);
        }).catch(err => {
            setActiveGoalHabits([]);
            console.log(err);
        });

        setActiveGoalIndex(index);
    }, [goals]);

    useEffect(() => {
        setActiveGoalHabitsIndex(0);
    }, [activeGoalIndex]);

    const handleActiveHabitIndex = useCallback((index:number) => {
        setActiveGoalHabitsIndex(index);

        console.log(activeGoalHabits[index]);
    }, []);

    return (
        <Container>
            <header>
                <h1>
                    Habit Tracker
                </h1>
                <div>
                    Olá, {name} !
                    <div>
                    </div>
                </div>
            </header>
            <div>
                <aside>
                    <button onClick={() => setIsModalOpen(true)}>Cadastrar Meta</button>
                    <ul>
                        {
                            goals.map((goal, index) => {
                                const active = index === activeGoalIndex;
                                return(
                                    <GoalItem active={active} onClick={ () => handleActiveGoal(index) }>
                                        <p>{goal.title}</p>
                                        {
                                            active && activeGoalHabits.length > 0 &&
                                            <div>
                                                {
                                                    activeGoalHabits.map((habit:any, indexHabit) => 
                                                        <HabitItem active={activeGoalHabitsIndex === indexHabit} onClick={() => handleActiveHabitIndex(indexHabit) }>
                                                            {habit.title}
                                                        </HabitItem>
                                                    )
                                                }
                                            </div>
                                        }
                                    </GoalItem>
                                );
                            })
                        }
                    </ul>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
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
                            registerPhase === 'category' && <GoalTypeSelector handleCategory={handleCategory} />
                        }
                        {
                            registerPhase === 'goal' && <GoalRegister handleGoal={handleGoal} />
                        }
                        {
                            registerPhase === 'habits' && <HabitsRegister handleHabits={handleHabits} goal_id={goals[goals.length - 1].id} />
                        }
                    </Modal>
                </aside>
                <section>
                    <ul>
                        <li onClick={() => scrollTo('.calendar')}>
                            Tracker
                        </li>
                        <li onClick={() => scrollTo('.statistics')}>
                            Estatísticas
                        </li>
                    </ul>
                    <div>
                        <Calendar deadends={goals[activeGoalIndex]?.deadends} habit={activeGoalHabits[activeGoalHabitsIndex]} className="calendar" />
                        <Statistics className="statistics" />
                    </div>
                </section>
            </div>
        </Container>
    );
}

export default Profile;
