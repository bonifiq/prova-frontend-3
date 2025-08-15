import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme}) => theme.palette.primary.darkest};
  padding: 1.25rem;
  border-radius: 10px;
`;