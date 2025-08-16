import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0px 10px;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  margin: 0px 10px;
  padding: 0px;
  width: 20px;
  height: 20px;
`;
