// @ts-nocheck
import React, { useCallback } from "react";
// import Modal from 'react-modal';
import { Container, ProfileButton } from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeActiveHabitState } from "../../redux/ducks/activeHabit";

import { getUser } from "../../services/utils";

const Navbar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("habit_user");
    window.location.href = "/";
  };

  const goToEditProfile = () => {
    history.push("/profile/edit");
  };

  const setMainDashboard = useCallback(() => {
    const newActiveHabit = { goalIndex: -1, habitIndex: -1 };
    localStorage.setItem("habit_active", JSON.stringify(newActiveHabit));
    dispatch(changeActiveHabitState(newActiveHabit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <h1 onClick={setMainDashboard}>Habit Tracker</h1>
      <ProfileButton>
        Olá, {getUser().name} !
        <div>
          <div onClick={goToEditProfile}>Editar perfil</div>
          <div onClick={logout}>Sair</div>
        </div>
      </ProfileButton>
    </Container>
  );
};

export default Navbar;
