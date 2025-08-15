import styled from "styled-components";
import close from '../../assets/close.svg'

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${({ theme}) => theme.palette.primary.regular};
  border-bottom: 1px solid ${({ theme}) => theme.palette.neutral.lightest};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.625rem;
`;

export const CloseButton = styled.button.attrs({
  type: "button",
  title: ''
})`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme}) => theme.palette.neutral.lightest};
  background: ${({ theme}) => theme.palette.primary.regular};
  &:hover {
    background: transparent;
    border-color: ${({ theme}) => theme.palette.neutral.lightest};
  }
  &:focus {
    outline: none;
  }
`;

export const CloseIcon = styled.img.attrs({
  src: close,
  height: 20,
  width: 20,
})`
`;

export const ScrollContent = styled.div<{ scrollBarColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0.625rem;
  max-height: calc(800px - 1.25rem);
  max-width: 320px;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ scrollBarColor }) => scrollBarColor};
    border-radius: 8px;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ scrollBarColor }) => scrollBarColor} transparent;
  -ms-overflow-style: none;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme}) => theme.palette.primary.darkest};
  padding: 1.25rem;
  border-radius: 10px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.313rem;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const UserInfoSkeletonWrapper = styled.div`
  width: 70%;
`;