import { LineDivisor } from "../line-divisor/line-divisor.styles";
import { CloseButton, Container, RowWrapper, Title } from "./header.styles";

function Header() {
  const onClickToClose = () => {
    window.parent.postMessage({ type: "onClickToClose" }, "*");
  };

  return (
    <Container data-testid="header-container">
      <RowWrapper>
        <Title>BonifiQ - Prova frontend</Title>
        <CloseButton onClick={onClickToClose}>
          <svg
            fill="#D9D9D9"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 52 52"
          >
            <path
              d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0
	L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1
	l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1
	L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"
            />
          </svg>
        </CloseButton>
      </RowWrapper>
      <LineDivisor />
    </Container>
  );
}

export default Header;
