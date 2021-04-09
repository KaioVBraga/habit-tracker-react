import styled from "styled-components";
import { darken } from "polished";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface CalendarItemProps {
  value?: number;
  inMonth?: boolean;
  isToday?: boolean;
  inGoal?: boolean;
  isDeadend?: boolean;
  inFrequency?: boolean;
}

export const CalendarItem = styled.div<CalendarItemProps>`
  width: 100%;
  height: 100%;
  padding: 2.5rem;
  background-color: ${(props) => {
    if (props.isDeadend) {
      return "#000";
    }

    if (!props.inMonth) {
      return "#cacaca";
    }

    if (!props.inFrequency) {
      return `#bababa`;
    }

    if (
      (props.inGoal && !props.isToday) ||
      (props.inGoal && props.isToday && props.value !== 0 && props.inFrequency)
    ) {
      return `hsl(${(props.value || 0) * 120}, 51%, 61%)`;
    }

    if (props.value === 1) {
      return "#68ce68";
    }

    // if (props.value === -1) {
    //   return "#ce6868";
    // }

    // if (props.value === 0) {
    //   return "#ce6868";
    // }

    if (props.isToday && props.inGoal) {
      return "#6868ce";
    }

    return "#dfdfdf";
  }};
  color: ${(props) => {
    if (!props.inFrequency && props.inMonth) {
      return "#999999";
    }

    if (!props.inMonth) {
      return "#cacaca";
    }

    if (props.inGoal || props.isDeadend) {
      return "#ffffff";
    }

    if (props.value === 1) {
      return "#ffffff";
    }
  }};
  cursor: ${(props) =>
    props.isToday && props.inGoal && props.inFrequency && props.value === 0
      ? "pointer"
      : "default"};
  transition: all 0.15s ease-in-out;
  display: flex;
  justify-content: center;
  font-size: 20px;
  user-select: none;

  &:hover {
    background-color: ${(props) =>
      props.isToday &&
      props.inGoal &&
      props.inFrequency &&
      props.value === 0 &&
      darken("0.05", "#6868ce")};
  }
`;

export const Tooltip = styled.div`
  width: 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #cecece;
  padding: 5px;
  font-size: 1.2rem;
`;
