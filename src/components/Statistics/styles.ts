import styled from 'styled-components';

export const Container = styled.div`
    width: 60rem;
    height: 100%;
    margin-bottom: 10vh;
    background-color: #cecece;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    & > div:not(:last-of-type) {
        margin-right: 1.5rem;
    }
`;

interface BarProps {
    percentage: number;
  }

export const Bar = styled.div<BarProps>`
    width: 100%;
    height: ${ props => props.percentage/100 * 50 }rem;
    background-color: #6868ce;
`;