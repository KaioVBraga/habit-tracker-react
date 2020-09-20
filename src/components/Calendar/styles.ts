import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 5rem;
    margin-bottom: 40vh;

    & > h2 {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    & > ul {
        display: flex;
        list-style: none;
        justify-content: space-around;
        margin-bottom: 0.5rem;
    }
`;

export const CalendarContainer = styled.div`
    width: 600px;
    background-color: #cecece;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 5px;
    grid-row-gap: 5px;

    & > div {
        width: 100%;
        height: 100%;
        padding: 2.5rem;
        background-color: #dfdfdf;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;

        &:hover {
            background-color: #bababa;
        }
    }
`;