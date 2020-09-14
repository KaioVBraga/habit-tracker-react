import styled from 'styled-components';


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-in-primary);
    background-color: var(--color-primary);
`;

export const Content = styled.div`
    width: 90vw;
    max-width: 700px;
    
    @media (min-width: 1100px) {
        max-width: 1100px;
        display: grid;
        grid-template-rows: 350px 1fr;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-areas:
            "logo hero hero"
            "buttons buttons total";
    }
`;

export const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 3.2rem;

    & > h1 {
        font-family: 'Saira Semi Condensed';
        font-size: 9.8rem;
    }

    & > h2 {
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 4.6rem;
        margin-top: 0.8rem;
    }

    @media (min-width: 1100px) {
        grid-area: logo;
        align-self: center;
        text-align: left;
        margin: 0;

        & > h2 {
            text-align: initial;
            font-size: 3.6rem;
        }
    }
`;

export const HeroImage = styled.img`
    width: 100%;

    @media (min-width: 1100px) {
        grid-area: hero;
        justify-self: end;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 3.2rem 0;

    & > a:first-of-type {
        margin-right: 1.6rem;
        background: var(--color-primary-lighter);
    }

    & > a:first-of-type:hover {
        background: var(--color-primary-light);
    }

    & > a:last-of-type {
        background: var(--color-secundary);
    }

    & > a:last-of-type:hover {
        background: var(--color-secundary-dark);
    }

    & > a {
        width: 30rem;
        height: 10.4rem;
        border-radius: 0.8rem;
        margin-right: 1.6rem;
        font: 700 2rem Archivo;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--color-button-text);
        transition: background-color 0.2s;
    }

    & > a > img {
        width: 4rem;
        margin-right: 2.4rem;
    }

    @media (min-width: 1100px) {
        grid-area: buttons;
        justify-content: flex-start;

        & > a {
            font-size: 2.4rem;
        }
    }
`;