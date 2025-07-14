import styled from "styled-components";

export const ContainerPage = styled.div`
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 12px 0px rgba(144, 144, 150, 0.4);
  border: 1px solid ${({ theme }) => theme.ShapeColors.background_border};
  /* padding: 15px; */
  position: relative;
`;

export const TitleContPosts = styled.h2`
  font-size: ${({ theme }) => theme.displaySize.xss};
  color: ${({ theme }) => theme.ShapeColors.shape_secondary};
  text-align: left;
  margin-top: 20px;
  margin-bottom: 8px;
  padding-left: 8px;
`;

export const Close = styled.button`
  background-color: ${({ theme }) => theme.BrandColors.brand_purple_medium};
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 18px;
  top: 28px;
  cursor: pointer;
`;

export const ContPosts = styled.div`
  height: 500px;
  overflow: auto;
  padding-right: 8px;
  padding-left: 8px;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 100px;
    display: block;
    transition: all 0.3s ease;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: none;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.BrandColors.brand_purple_medium};
    border-radius: 100px;
  }
`;
