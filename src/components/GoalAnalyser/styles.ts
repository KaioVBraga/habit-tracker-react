import styled from "styled-components";
import { darken } from "polished";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Container = styled.div`
  width: 80vw;
  height: min-content;

  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 7rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: max-content;
`;

export const HabitsContainer = styled.div`
  width: 100%;
  height: max-content;

  & > div {
    & > h2 {
      cursor: pointer;
    }
  }

  & > * {
    margin-bottom: 5rem;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin-top: 1.5rem;

  & > label:not(:first-child) {
    margin-top: 1rem;
  }
`;
