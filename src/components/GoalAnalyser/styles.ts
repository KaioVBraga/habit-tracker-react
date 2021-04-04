import styled from "styled-components";
import { darken } from "polished";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Container = styled.div`
  width: 100%;
  height: min-content;

  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 2rem;
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
    margin-bottom: 1rem;
  }
`;
