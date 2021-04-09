import styled from "styled-components";

interface Props {
  sidebar?: boolean;
  progress: number;
}

interface ProgressProps {
  progress: number;
}

export const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 5px;

  span {
    position: absolute;
    top: 0;
    left: 0.5rem;
    color: ${(props) => (props.progress < 100 ? "#888" : "#6adb84")};
    filter: brightness(4);
    font-weight: 700;
  }
`;

export const ProgressBar = styled.div<ProgressProps>`
  font-size: 12pt;
  background-color: ${(props) => (props.progress < 100 ? "#888" : "#6adb84")};
  width: ${(props) => `${props.progress}%`};
  height: 2.5rem;
  padding: 0.15rem 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  transition: 0.5s all ease-in-out;
`;
