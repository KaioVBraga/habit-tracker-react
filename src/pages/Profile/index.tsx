import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function Profile() {
    const history = useHistory();

    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));

    console.log(name);

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
    }

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
                    Ola, Kaio Vinycius !
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
