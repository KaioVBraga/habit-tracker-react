import styled from "styled-components";
import { darken } from "polished";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Container = styled.header`
  background-color: #8257e5;
  color: white;
  height: 7rem;
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > h1 {
    font-family: "Saira Semi Condensed";
    font-size: 32px;
    cursor: pointer;
  }
`;

export const ProfileButton = styled.div`
  display: flex;
  align-items: center;

  height: 100%;

  /* Image Container */
  /* & > div {
        width: 2.5vw; 
        height: 2.5vw; 
        margin-left: 20px; 
        border-radius: 50%; 
        background-color: gray;
    } */

  & > div {
    top: 7rem;
    right: 0;
    width: 19.5rem;
    height: 0rem;
    position: absolute;
    background-color: #8257e5;
    overflow: hidden;
    padding: 0 1rem 0 1rem;

    & > div {
      height: 3rem;
      cursor: pointer;
    }
  }

  &:hover {
    & > div {
      padding: 1rem;
      height: 10rem;
      border-left: 1px solid ${(props) => darken("0.1", "#8257e5")};
      border-right: 1px solid ${(props) => darken("0.1", "#8257e5")};
      border-bottom: 1px solid ${(props) => darken("0.1", "#8257e5")};
    }
  }
`;
