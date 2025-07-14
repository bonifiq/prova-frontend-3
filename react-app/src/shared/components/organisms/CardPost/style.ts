import styled from "styled-components";

export const ContenCard = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.ShapeColors.background_border};
  gap: 8px;
  margin-bottom: 12px;

  h3 {
    font-size: ${({ theme }) => theme.textSize.sm};
    color: ${({ theme }) => theme.ContentColors.text_primary};
    text-align: left;
    font-weight: 500;
    margin: 0;
    line-height: 150%;
  }
  p {
    font-size: ${({ theme }) => theme.textSize.xs};
    color: ${({ theme }) => theme.ContentColors.text_primary};
    text-align: left;
    font-weight: 500;
    margin-top: 0;
    line-height: 160%;
  }
`;
