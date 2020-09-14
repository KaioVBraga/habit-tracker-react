import React from "react";
import { Link } from "react-router-dom";

import ladingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";

import { Container, Content, LogoContainer, HeroImage, ButtonsContainer } from './styles';

const Landing:React.FC = () => {
    return (
        <Container>
            <Content>
                <LogoContainer>
                    <h1>Habit Tracker</h1>
                    <h2>Tome o controle da sua vida.</h2>
                </LogoContainer>

                <HeroImage
                    src={ladingImg}
                    alt="Plataforma de estudos online."
                />

                <ButtonsContainer>
                    <Link to="/signin">
                        <img src={studyIcon} alt="Study" />
                        Logar
                    </Link>

                    <Link to="/signup">
                        <img src={giveClassesIcon} alt="Give Lessons" />
                        Cadastrar
                    </Link>
                </ButtonsContainer>
            </Content>
        </Container>
    );
}

export default Landing;
