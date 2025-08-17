import styled from "styled-components";
import { COLORS } from "./utils/colors/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${COLORS.primary};
  padding: 5px 0px;
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.primary};
`;

export const Content = styled.section`
  flex: 1;
  overflow-y: auto;
`;
