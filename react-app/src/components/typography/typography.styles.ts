import styled from "styled-components";
import type { TypographyProps } from "./types";

export const StyledTypography = styled.span<TypographyProps>`
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.color ? props.color : ({ theme }) => theme.palette.neutral.lightest};
  margin: ${(props) => props.hasMargin ? '0 0 10px 0' : '0'};
`;