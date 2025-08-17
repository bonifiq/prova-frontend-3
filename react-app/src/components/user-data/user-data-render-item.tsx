import { Container, Description, Title } from "./user-data.styles";

export interface UserDataRenderItemProps {
  title: string;
  body: string;
}

function UserDataRenderItem({ title, body }: UserDataRenderItemProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{body}</Description>
    </Container>
  );
}

export default UserDataRenderItem;
