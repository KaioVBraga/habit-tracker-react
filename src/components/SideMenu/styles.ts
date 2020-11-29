import styled from 'styled-components';

export const Container = styled.aside`
    background-color: #cccccc; 
    width: 20vw;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
        font-size: 32px;
        display: flex;
    }

    & > button {
        width: 80%;
        margin: 0.5rem 0 0 0;
        padding: 1rem;
        background-color: #a689ea;
        color: #fff;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:hover {
            background-color: #8257e5;
        }
    }

    & > ul {
        width: 80%;
        margin-top: 2.5rem;
        display: flex; 
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style: none;
    }
`;

interface GoalItemProps {
    active?: boolean;
}

export const GoalItem = styled.li<GoalItemProps>`
    position: relative;
    font-size: 1.5rem;
    width: 100%;
    cursor: pointer;
    user-select: none;
    padding: 1rem;

    border-bottom: 1px solid #bbb;
    transition: 0.15s all ease-in-out;
    
    color: ${props => props.active && '#fff'};
    background-color: ${props => props.active && '#686868'};

    &:hover {
        color: #fff;
        background-color: #686868;
    }

    & > div {
        font-size: 1.3rem;
        
        & > p {
            margin: 1rem -1rem 1rem -1rem;
            padding: 0.8rem 1rem;
            &:hover {
                color: #fff;
                background-color: #474747;
            }
        }
    }
`;

interface HabitItemProps {
    active?: boolean;
}

export const HabitItem = styled.li<HabitItemProps>`
    margin: 1rem -1rem 1rem -1rem;
    padding: 0.8rem 1rem;

    background-color: ${props => props.active && '#474747'};

    &:hover {
        color: #fff;
        background-color: #474747;
    }
`;