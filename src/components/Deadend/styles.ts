import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8px;

    & > input[type=date] {
        border: none;
        margin-top: 5px;
    }
`;