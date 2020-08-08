import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  padding-top: 70px;
`;

export const BaseHeader = styled.div`
  height: 70px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  box-shadow: 0px 0px 3px black;
`;

export const WrapHeader = styled.div`
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
`;