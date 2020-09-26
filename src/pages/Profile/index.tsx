import React, { useState, useEffect, useCallback } from "react";
import Modal from 'react-modal';
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";
import Calendar from '../../components/Calendar';
import GoalTypeSelector from '../../components/GoalTypeSelector';
import GoalRegister from '../../components/GoalRegister';
import { Container } from './styles';
import Statistics from "../../components/Statistics";

interface Goal {
    id: Number,
    title: String,
    type: String,
    active: Number,
    description: String,
    user_id: Number,
    reward: String,
    createdAt: String,
    updatedAt: String
};

interface Goals extends Array<Goal>{};

const Profile:React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [goals, setGoals] = useState<Goals>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerPhase, setRegisterPhase] = useState('category');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getProfile = async (id:Number) => {
            try {
                const response = await api.get(`users/${id}`);

                setGoals(response.data.goals);
            } catch (err) {
                console.log(err);
            }
        }

        const habit_user = localStorage.getItem('habit_user') as string;
        const user = JSON.parse(habit_user)

        setName(user.name);
        setEmail(user.email);

        getProfile(user.id);
    }, []);

    const handleCategory = useCallback((category:string) => {
        setCategory(category);
        setRegisterPhase('goal');
    }, []);

    const handleGoal = useCallback((goal) => {
        console.log(goal);
    },[]);

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
                            goals.map( goal => {
                                return(
                                    <li>
                                        {goal.title}
                                    </li>
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
                    </Modal>
                </aside>
                <section>
                    <ul>
                        <li>
                            Tracker
                        </li>
                        <li>
                            Estatísticas
                        </li>
                    </ul>
                    <div>
                        <Calendar />
                        <Statistics /> 
                    </div>
                </section>
            </div>
        </Container>
    );
}

export default Profile;
