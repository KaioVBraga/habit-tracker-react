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

        & > aside {
            background-color: #cccccc; 
            width: 20vw;
            padding-top: 1rem;

            & > h2 {
                font-size: 32px;
                display: flex;
                justify-content: center
            }

            & > ul {
                display: flex; 
                justify-content: center;
                align-items: center;
                list-style: none;

                & > li {
                    font-size: 1.2rem;
                    width: 18rem;
                }
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
                background-color: #a689ea; 
                height: 7rem; 
                width: 100%;
                list-style: none;
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