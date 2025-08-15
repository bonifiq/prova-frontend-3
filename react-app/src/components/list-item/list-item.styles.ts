import styled from "styled-components";

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.313rem;
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.palette.neutral.lightest};
  margin: 0;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.palette.neutral.lightest};
  margin: 0;
`;