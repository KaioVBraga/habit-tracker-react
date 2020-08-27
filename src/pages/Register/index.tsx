import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function Register() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: "", to: "" },
    ]);

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
    }

    function setScheduleItemValue(
        position: number,
        field: string,
        value: string
    ) {
        const updatedScheduleItems = scheduleItems.map(
            (scheduleItem, index) => {
                if (index === position) {
                    return { ...scheduleItem, [field]: value };
                }

                return scheduleItem;
            }
        );

        setScheduleItems(updatedScheduleItems);
    }

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

        history.push('/profile');
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Seja o mestre do seu destino!"
                description="O primeiro passo é preencher este formulário de incrição."
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
                            value={avatar}
                            onChange={(e) => {
                                setAvatar(e.target.value);
                            }}
                        />
                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            value={whatsapp}
                            onChange={(e) => {
                                setWhatsapp(e.target.value);
                            }}
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
