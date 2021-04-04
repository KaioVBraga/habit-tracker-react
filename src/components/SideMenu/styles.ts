import styled from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.aside`
  background-color: #cccccc;
  width: 20vw;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h2 {
    font-size: 32px;
    display: flex;
  }

  & > button {
    width: 90%;
    margin: 0.5rem 0 0 0;
    padding: 1rem;
    background-color: #a689ea;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: #8257e5;
    }
  }

  & > ul {
    width: 100%;
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
  }
`;

interface GoalItemProps {
  active?: boolean;
  goalSelected?: boolean;
}

export const GoalItem = styled.li<GoalItemProps>`
  position: relative;
  font-size: 1.5rem;
  width: 100%;
  cursor: pointer;
  user-select: none;

  border-bottom: 1px solid #bbb;
  transition: 0.15s all ease-in-out;

  color: ${(props) => props.active && "#fff"};
  background-color: ${(props) => props.active && lighten("0.3", "#686868")};
  margin-bottom: 1rem;

  &:hover {
    color: #fff;
    background-color: ${(props) => lighten("0.3", "#686868")};
  }

  & > div {
    font-size: 1.3rem;

    & > p {
      margin: 1rem -1rem 1rem -1rem;
      padding: 0.8rem 1rem;
      &:hover {
        color: #fff;
        background-color: ${(props) => lighten("0.35", "#474747")};
      }
    }
  }

  & > span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    background-color: ${(props) =>
      props.goalSelected
        ? lighten("0.35", "#474747")
        : lighten("0.3", "#686868")};
  }
`;

interface HabitItemProps {
  active?: boolean;
}

export const HabitItem = styled.li<HabitItemProps>`
  position: relative;
  border-top: 1px solid #cecece;
  padding: 0.8rem 1rem;
  min-height: 4.8rem;
  display: flex;
  justify-content: space-between;

  background-color: ${(props) => props.active && lighten("0.35", "#474747")};

  & > span {
    display: ${(props) => (props.active ? "flex" : "none")};
  }

  &:hover {
    color: #fff;
    background-color: ${(props) => lighten("0.35", "#474747")};

    & > span {
      display: flex;
    }
  }
`;

interface SetupContainerProps {
  active?: boolean;
}

export const SetupContainer = styled.span<SetupContainerProps>`
  display: flex;
  &:hover {
    display: flex;
  }
`;

export const CloseButton = styled.span`
  position: relative;
  font-size: 20px;
  color: #ce6868;
  margin-left: 8px;
`;

export const AddButton = styled.span`
  position: relative;
  font-size: 20px;
`;

export const EditButton = styled.span`
  position: relative;
  font-size: 20px;
  margin-left: 8px;
`;
