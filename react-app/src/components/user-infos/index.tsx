import { LineDivisor } from "../line-divisor/line-divisor.styles";
import { Container, Text } from "./user-infos.styles";

interface UserProperties {
  name?: string;
  email?: string;
}

function UserInfos({
  name = "Jean Junior Ros",
  email = "junior7511@hotmai.com",
}: UserProperties) {
  return (
    <Container>
      <Text>{`Nome: ${name}`}</Text>
      <Text style={{ margin: "0px 0px 10px 10px" }}>{`E-mail: ${email}`}</Text>
      <LineDivisor />
    </Container>
  );
}

export default UserInfos;
