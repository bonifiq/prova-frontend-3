import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Container, Content, HeaderWrapper } from "./App.styles";
import Header from "./components/header";
import UserData from "./components/user-data";
import UserInfos from "./components/user-infos";
import UserNotFound from "./components/user-not-found";
import type {
  UserDataItem,
  UserDataResponse,
} from "./dtos/user-data/user-data-response";
import type { UserInfoResponse } from "./dtos/user-infos/user-infos-response";
import { useGetUser } from "./hooks/user/use-get-user";

function App() {
  const [userId, setUserId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfoResponse>();
  const [userData, setUserData] = useState<UserDataResponse>();
  const [userError, setUserError] = useState<boolean>(false);
  const { GetUser } = useGetUser({
    setIsLoading,
    setUserInfo,
    setUserData,
    setUserError,
  });

  useEffect(() => {
    try {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.loggedUserId) {
          setUserId(parseInt(event.data.loggedUserId));
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    } catch (error) {
      console.log("[App] - Getting user id error: ", error);
    }
  }, []);

  useEffect(() => {
    if (userId != undefined) {
      GetUser({ userId: userId });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <Container>
        <HeaderWrapper>
          <Header />
          {!userError && (
            <UserInfos
              isLoading={isLoading}
              name={userInfo?.name}
              email={userInfo?.email}
            />
          )}
        </HeaderWrapper>
        <Content>
          {!userError && (
            <UserData
              isLoading={isLoading}
              userDataList={userData?.userData as UserDataItem[]}
            />
          )}
          {userError && <UserNotFound />}
        </Content>
      </Container>
    </>
  );
}

export default App;
