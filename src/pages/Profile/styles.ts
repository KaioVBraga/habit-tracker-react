import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  position: relative;
  width: 100%;

  & > header {
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
    }
  }

  & > div {
    display: flex;
    min-height: 100vh;

    & > section {
      background-color: white;
      width: 80vw;

      & > ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 24px;
        color: #fff;
        height: 7rem;
        width: 100%;
        list-style: none;

        & > li {
          background-color: #a689ea;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease-in-out;

          &:hover {
            background-color: #8257e5;
          }
        }
      }

      & > div {
        background-color: white;
        /* height: 90%;  */
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        /* & > * {
                    margin-top: 16px;
                } */
      }
    }
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
