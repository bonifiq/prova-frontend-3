import styled from "styled-components";
import { COLORS } from "./utils/colors/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.primary};
  min-height: 100vh;
  padding: 5px 0px;
`;
