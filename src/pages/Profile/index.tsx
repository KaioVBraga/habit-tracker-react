import React from "react";

import Calendar from "../../components/Calendar";
import { Container, ProfileButton } from "./styles";
import Statistics from "../../components/Statistics";

import { getUser } from "../../services/utils";
import SideMenu from "../../components/SideMenu";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import GoalAnalyser from "../../components/GoalAnalyser";

const Profile: React.FC = () => {
  const history = useHistory();
  const scrollTo = (className: string) => {
    const scrollY = window?.scrollY;
    const classRectTop =
      document?.querySelector(className)?.getBoundingClientRect()?.top || 0;

    const y = classRectTop + scrollY;

    window.scroll({
      top: y - 100,
      behavior: "smooth",
    });
  };

  const logout = () => {
    localStorage.removeItem("habit_user");
    window.location.href = "/";
  };

  const goToEditProfile = () => {
    history.push("/profile/edit");
  };

  const { activeHabit, goals } = useSelector((state: any) => state);

  return (
    <Container>
      <header>
        <h1>Habit Tracker</h1>
        <ProfileButton>
          Olá, {getUser().name} !
          <div>
            <div onClick={goToEditProfile}>Editar perfil</div>
            <div onClick={logout}>Sair</div>
          </div>
        </ProfileButton>
      </header>
      <div>
        <SideMenu />
        {activeHabit.habitIndex > -1 ? (
          <section>
            <ul>
              <li onClick={() => scrollTo(".calendar")}>Tracker</li>
              <li onClick={() => scrollTo(".statistics")}>Estatísticas</li>
            </ul>
            <div>
              <Calendar className="calendar" />
              <Statistics className="statistics" />
            </div>
          </section>
        ) : (
          <GoalAnalyser />
        )}
      </div>
    </Container>
  );
};

export default Profile;
