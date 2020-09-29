import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 70rem;

    & > h1 {
        width: calc(100% - 2rem);
        margin-top: -2rem;
        padding-bottom: 1.6rem;
        border-bottom: 1px solid var(--color-line-in-white);
    }

    & > ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 2rem;

        & > li {
            list-style: none;
            text-align: center;
            
            background-color: #cecece;
            width: 15rem;
            height: 15rem;
            margin: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.15s ease-in-out;

            &:hover {
                background-color: #bababa;
            }
        }
    }
`;