import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8px;

    & > ul {
        display: flex;
        list-style: none;
    }
`;

interface DayItemProps {
    marked?: boolean;
}

export const DayItem = styled.li<DayItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${ props => props.marked && '#fff'};
    background-color: ${ props => props.marked ? '#686868' : '#cecece'};
    width: 32px;
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
        background-color: #bababa;
    }
`;