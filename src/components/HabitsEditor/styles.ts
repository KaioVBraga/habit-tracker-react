import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 70rem;

  & > h1 {
    width: 100%;
    margin-top: -2rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--color-line-in-white);
  }

  & > form {
    width: 100%;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > button {
      width: 100%;
      height: 5.6rem;
      background: var(--color-secundary);
      color: var(--color-button-text);
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.6rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 3.2rem;

      &:hover {
        background: var(--color-secundary-dark);
      }
    }

    & > fieldset {
      border: none;
      padding: 0;
    }

    & > fieldset:not(:first-of-type) {
      margin-top: 5rem;
    }
  }
`;

export const PlusIcon = styled(BsPlusCircle)`
  font-size: 60px;
  margin-top: 2.5rem;
  cursor: pointer;
`;

export const BaseContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > * {
    margin-right: 0.5rem;
  }
`;

export const QuantitativeContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > * {
    margin-right: 0.5rem;
  }
`;

interface MarkableLabelProps {
  checked: boolean;
}

export const MarkableLabel = styled.label<MarkableLabelProps>`
  font-weight: ${(props) => props.checked && "bold"};
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
