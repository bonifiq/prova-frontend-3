import { LineDivisor } from "../line-divisor/line-divisor.styles";
import { Container, Text, UserInfoSkeleton } from "./user-infos.styles";

interface UserInfosProps {
  name?: string;
  email?: string;
  isLoading: boolean;
}

function UserInfos({ name, email, isLoading = false }: UserInfosProps) {
  function renderContent(isLoading: boolean) {
    if (isLoading) {
      return (
        <>
          <UserInfoSkeleton />
          <UserInfoSkeleton style={{ margin: "0px 0px 10px 10px" }} />
        </>
      );
    } else {
      return (
        <>
          <Text>{`Nome: ${name}`}</Text>
          <Text
            style={{ margin: "0px 0px 10px 10px" }}
          >{`E-mail: ${email}`}</Text>
        </>
      );
    }
  }

  return (
    <Container>
      {renderContent(isLoading)}
      <LineDivisor style={{ marginBottom: 5 }} />
    </Container>
  );
}

export default UserInfos;
