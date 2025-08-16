import { Container } from "./App.styles";
import Header from "./components/header";
import UserInfos from "./components/user-infos";

function App() {
  return (
    <>
      <Container>
        <Header />
        <UserInfos />
      </Container>
    </>
  );
}

export default App;
