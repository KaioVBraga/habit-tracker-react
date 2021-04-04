import styled from "styled-components";
import { darken } from "polished";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Container = styled.div`
  margin-top: 5rem;
  margin-bottom: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & > section {
    & > h2 {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    & > ul {
      display: flex;
      list-style: none;
      justify-content: space-around;
      margin-bottom: 0.5rem;
    }
  }
`;

export const CalendarContainer = styled.div`
  width: 600px;
  background-color: #cecece;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

export const IconLeft = styled(BsChevronLeft)`
  font-size: 56px;
  margin: 64px 16px 0 0;
  cursor: pointer;
`;

export const IconRight = styled(BsChevronRight)`
  font-size: 56px;
  margin: 64px 0 0 16px;
  cursor: pointer;
`;
