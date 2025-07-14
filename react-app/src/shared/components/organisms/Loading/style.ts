import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    left: -40%;
  }
  100% {
    left: 100%;
  }
`;
export const LoadingCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 580px;
`;
export const LoadingBar = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.ShapeColors.shape_secondary};
  background: #fff;
  overflow: hidden;
  border-radius: 2px;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 40%;
    background: ${({ theme }) => theme.BrandColors.brand_purple};
    animation: ${loadingAnimation} 1.2s linear infinite;
    border-radius: 2px;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.BrandColors.brand_purple};
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto; /* Centralizar dentro do container */
`;
