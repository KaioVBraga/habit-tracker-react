import React, { useState, useCallback, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateClass = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = (await api.post('session/login', { email, password })).data;
            localStorage.setItem('habit_user', JSON.stringify(response));
            
            history.push('/profile');
        } catch(err) {
            console.log(err.response);
        }
    }, [email, history, password]);

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Retome o controle!"
                description="Logue e veja o andamento dos seus hábitos."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Warning" />
                            Importante! <br />
                            Preencha todos os campos
                        </p>
                        <button type="submit">Logar</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default Login;
