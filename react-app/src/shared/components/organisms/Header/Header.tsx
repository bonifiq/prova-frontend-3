import { ContentHeader } from "./style";

interface HeaderProps {
  name: string;
  email: string;
}

export default function Header({ name, email }: HeaderProps) {
  return (
    <ContentHeader>
      <h1>
        <b>Olá,</b> {name}
      </h1>
      <h2>
        <b>E-mail: </b>
        {email}
      </h2>
    </ContentHeader>
  );
}
