import FlatList from "flatlist-react/lib";
import type { UserDataItem } from "../../dtos/user-data/user-data-response";
import UserDataRenderItem from "./user-data-render-item";
import { Container, UserDataSkeleton } from "./user-data.styles";

interface UserDataProps {
  userDataList: UserDataItem[];
  isLoading: boolean;
}

function UserData({ userDataList, isLoading }: UserDataProps) {
  function renderContent(isLoading: boolean) {
    if (isLoading) {
      return (
        <>
          <Container data-testid="user-data-loading">
            <UserDataSkeleton />
          </Container>
        </>
      );
    } else {
      return (
        <>
          <FlatList renderItem={UserDataRenderItem} list={userDataList} />
        </>
      );
    }
  }

  return renderContent(isLoading);
}

export default UserData;
