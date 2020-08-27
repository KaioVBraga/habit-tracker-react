import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function Login() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [bio, setBio] = useState("");

    // const [subject, setSubject] = useState("");
    // const [cost, setCost] = useState("");

    // const [scheduleItems, setScheduleItems] = useState([
    //     { week_day: 0, from: "", to: "" },
    // ]);

    // function addNewScheduleItem() {
    //     setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
    // }

    // function setScheduleItemValue(
    //     position: number,
    //     field: string,
    //     value: string
    // ) {
    //     const updatedScheduleItems = scheduleItems.map(
    //         (scheduleItem, index) => {
    //             if (index === position) {
    //                 return { ...scheduleItem, [field]: value };
    //             }

    //             return scheduleItem;
    //         }
    //     );

    //     setScheduleItems(updatedScheduleItems);
    // }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        // api.post("classes", {
        //     name,
        //     avatar,
        //     whatsapp,
        //     bio,
        //     subject,
        //     cost: Number(cost),
        //     schedule: scheduleItems,
        // })
        //     .then(() => {
        //         alert("Agora você é um proffy!");
        //         history.push("/");
        //     })
        //     .catch(() => {
        //         alert("Error");
        //     });

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);

        history.push('/profile');
    }

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
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
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
