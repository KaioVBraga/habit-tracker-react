import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

const Register:React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateUser = async (e: FormEvent) => {
        e.preventDefault();
 
        try {
            const response = (await api.post('session/register', {
                name,
                email,
                password,
            })).data;

            localStorage.setItem('habit_user', JSON.stringify(response));
            history.push('/profile');
        } catch(err) {
            if(err.response.status === 409) {
                swal('Email já cadastrado !', 'Por favor, insira outro email.', 'error');
            }

            if(err.response.status === 404) {
                swal('Erro no formulário !', 'Por favor, reveja os campos.', 'error');
            }
        }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Seja o mestre do seu destino!"
                description="O primeiro passo é preencher este formulário de incrição."
            />

            <main>
                <form onSubmit={handleCreateUser}>
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
                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Warning" />
                            Importante! <br />
                            Preencha todos os campos
                        </p>
                        <button type="submit">Cadastrar</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default Register;
