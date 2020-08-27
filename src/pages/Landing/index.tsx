import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import ladingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";

import api from "../../services/api";

import "./styles.css";

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    // useEffect(() => {
    //     api.get("connections").then((response) => {
    //         const { total } = response.data;

    //         setTotalConnections(total);
    //     });
    // }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <h1
                        style={{
                            fontFamily: 'Saira Semi Condensed',
                            fontSize: '9.8rem'
                        }}
                    >Habit Tracker</h1>
                    <h2>Tome o controle da sua vida.</h2>
                </div>

                <img
                    src={ladingImg}
                    alt="Plataforma de estudos online."
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/signin" className="study">
                        <img src={studyIcon} alt="Study" />
                        Logar
                    </Link>

                    <Link to="/signup" className="give-classes">
                        <img src={giveClassesIcon} alt="Give Lessons" />
                        Cadastrar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;
