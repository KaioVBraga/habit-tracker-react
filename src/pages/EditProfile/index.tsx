import React, { useState, FormEvent, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { getUser } from '../../services/utils';

import { Container } from './styles';

const Register: React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        api.get(`users/${getUser().id}`).then(res => {
            const { name, email } = res.data;
            setName(name);
            setEmail(email);
        })
    }, []);

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();

        api.put(`users/${getUser().id}`, {
            name,
            email
        })
            .then(res => {
                const userString = localStorage.getItem('habit_user') || '';
                const user = JSON.parse(userString);

                user.name = res.data.name;
                user.email = res.data.email;

                localStorage.setItem('habit_user', JSON.stringify(user));
                history.push('/profile');
            })
            .catch(err => {
                if (err.response.status === 409) {
                    swal('Email já cadastrado !', 'Por favor, insira outro email.', 'error');
                }

                if (err.response.status === 404) {
                    swal('Erro no formulário !', 'Por favor, reveja os campos.', 'error');
                }
            });
    }

    return (
        <Container>
            <PageHeader
                title="Seja o mestre do seu destino!"
                description="O primeiro passo é preencher este formulário de incrição."
            />

            <main>
                <form onSubmit={handleUpdateUser}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>

                    <footer>
                        <button type="submit">Atualizar perfil</button>
                    </footer>
                </form>
            </main>
        </Container>
    );
}

export default Register;
