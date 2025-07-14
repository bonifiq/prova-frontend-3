import styled from "styled-components";

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  padding: 12px;
  margin: 8px;

  background-color: ${({ theme }) => theme.BrandColors.brand_purple};
  h1 {
    font-size: ${({ theme }) => theme.textSize.lg};
    margin: 0;
    b {
      font-weight: 500;
    }
  }
  h2 {
    font-size: ${({ theme }) => theme.textSize.sm};
    margin: 0;
    font-weight: 500;
  }
`;
