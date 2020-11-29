import React from "react";

import Calendar from '../../components/Calendar';
import { Container } from './styles';
import Statistics from "../../components/Statistics";

import { getUser } from '../../services/utils';
import SideMenu from "../../components/SideMenu";

const Profile: React.FC = () => {
    const scrollTo = (className: string) => {
        const scrollY = window?.scrollY;
        const classRectTop = document?.querySelector(className)?.getBoundingClientRect()?.top || 0;

        const y = classRectTop + scrollY;

        window.scroll({
            top: y - 100,
            behavior: 'smooth'
        });
    }

    return (
        <Container>
            <header>
                <h1>
                    Habit Tracker
                </h1>
                <div>
                    Olá, {getUser().name} !
                </div>
            </header>
            <div>
                <SideMenu />

                <section>
                    <ul>
                        <li onClick={() => scrollTo('.calendar')}>
                            Tracker
                        </li>
                        <li onClick={() => scrollTo('.statistics')}>
                            Estatísticas
                        </li>
                    </ul>

                    <div>
                        <Calendar className="calendar" />
                        <Statistics className="statistics" />
                    </div>
                </section>
            </div>
        </Container>
    );
}

export default Profile;
