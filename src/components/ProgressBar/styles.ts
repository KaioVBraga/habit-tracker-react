import styled from "styled-components";

interface Props {
  sidebar?: boolean;
}

interface ProgressProps {
  progress: number;
}

export const Container = styled.div<Props>`
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 5px;
`;

export const ProgressBar = styled.div<ProgressProps>`
  font-size: 12pt;
  background-color: ${(props) => (props.progress < 100 ? "#888" : "#6adb84")};
  width: ${(props) => `${props.progress}%`};
  min-width: 7rem;
  padding: 0.15rem 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  transition: 0.5s all ease-in-out;

  span {
    color: ${(props) => (props.progress < 100 ? "#888" : "#6adb84")};
    filter: brightness(2);
    font-weight: 700;
  }
`;
