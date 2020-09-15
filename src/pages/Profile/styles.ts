import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100%;

    & > header {
        background-color: #8257e5;
        color: white; 
        height: 10vh; 
        width: 100vw;
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
            height: 90vh; 
            width: 20vw;

            & > h2 {
                font-size: 32px;
                display: flex;
                justify-content: center
            }

            & > ul {
                display: flex; 
                justify-content: center;
                align-items: center;

                & > li {
                    font-size: 1.2rem;
                    width: 18rem;
                }
            }
        }

        & > section {
            background-color: white; 
            height: 90vh;
            width: 80vw;

            & > ul {
                display: flex; 
                justify-content: space-around; 
                align-items: center; 
                font-size: 24px; 
                background-color: #a689ea; 
                height: 10%; 
                width: 80vw;
            }

            & > div {
                background-color: white; 
                height: 90%; 
                width: 80vw;
            }
        }
    }
`;