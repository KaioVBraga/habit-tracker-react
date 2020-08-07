import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  padding-top: 70px;
`;

export const BaseHeader = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  box-shadow: 0px 0px 3px black;
  justify-content: space-between;
`;