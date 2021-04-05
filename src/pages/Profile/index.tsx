import React from "react";

import Calendar from "../../components/Calendar";
import { Container, ProfileButton } from "./styles";
import Statistics from "../../components/Statistics";

import { getUser } from "../../services/utils";
import SideMenu from "../../components/SideMenu";
import { useSelector } from "react-redux";
import GoalAnalyser from "../../components/GoalAnalyser";
import GeneralAnalyser from "../../components/GeneralAnalyser";
import Navbar from "../../components/Navbar";

const Profile: React.FC = () => {
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

  const { activeHabit, goals } = useSelector((state: any) => state);

  return (
    <Container>
      <Navbar />
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
        ) : activeHabit.goalIndex > -1 ? (
          <GoalAnalyser />
        ) : (
          <GeneralAnalyser />
        )}
      </div>
    </Container>
  );
};

export default Profile;
