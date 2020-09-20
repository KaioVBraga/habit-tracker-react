import React, { useState, useEffect, FormEvent } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";
import Calendar from '../../components/Calendar';
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
                    <h2>Seus hábitos</h2>
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
