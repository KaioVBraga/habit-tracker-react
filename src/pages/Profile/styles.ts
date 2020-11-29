import styled from 'styled-components';

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
            font-family: 'Saira Semi Condensed'; 
            font-size: 32px;
        }

        & > div {
            display: flex; 
            align-items: center;

            /* Image Container */
            & > div {
                width: 2.5vw; 
                height: 2.5vw; 
                margin-left: 20px; 
                border-radius: 50%; 
                background-color: gray;
            }
        }
    }

    & > div { 
        display: flex;
        min-height: 100vh;

        & > aside {
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
        }

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