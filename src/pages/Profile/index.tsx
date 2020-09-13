import React, { useState, useEffect, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

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

function Profile() {
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
        <div style={{ position: 'absolute', top: 0, left:0 }}>
            <div 
                style={{ 
                    backgroundColor: '#8257e5',
                    color: 'white', 
                    height: '10vh', 
                    width: '100vw',
                    paddingLeft: '2vw',
                    paddingRight: '2vw',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ fontFamily: 'Saira Semi Condensed', fontSize: '32px' }}>
                    Habit Tracker
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    Ola, {name} !
                    <div style={{ width: '2.5vw', height: '2.5vw', marginLeft: '20px', borderRadius: '50%', backgroundColor: 'gray' }}> 
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ backgroundColor: '#cccccc', height: '90vh', width: '20vw' }}>
                    <div
                        style={{
                            fontSize: '32px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        Seus hábitos
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            goals.map( goal => {
                                return(
                                    <div style={{ fontSize: '1.2rem', width: '18rem' }}>
                                        {goal.title}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div style={{ backgroundColor: 'white', height: '90vh', width: '80vw' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '24px', backgroundColor: '#a689ea', height: '10%', width: '80vw' }}>
                        <div>
                            Tracker
                        </div>
                        <div>
                            Estatísticas
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white', height: '90%', width: '80vw' }}>
                        ALGUM CALENDÁRIO
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
