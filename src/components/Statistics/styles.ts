import styled from "styled-components";

export const Container = styled.div`
  width: 60rem;
  height: 100%;
  margin-bottom: 10rem;
  background-color: #cecece;
  display: flex;
  flex-direction: column;

  justify-content: center;

  & > div:not(:last-of-type) {
    margin-right: 1.5rem;
  }
`;

export const DescriptionContainer = styled.table`
  width: 60rem;
  height: 100%;
  padding: 5rem 0;

  /* table-layout: fixed; */

  & > tr {
    width: 100%;
    line-height: 1.8;

    & > td:first-child {
      min-width: max-content;
      width: 65%;
      padding: 0 10px;
    }

    & > td {
      width: 35%;
      padding: 0 10px;
    }
  }
`;

export const BarsContainer = styled.div`
  width: 60rem;
  height: 100%;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  & > div:not(:last-of-type) {
    margin-right: 1.5rem;
  }
`;

interface BarProps {
  percentage: number;
}

export const Bar = styled.div<BarProps>`
  width: 100%;
  height: ${(props) => (props.percentage / 100) * 50}rem;
  background-color: #6868ce;
`;
