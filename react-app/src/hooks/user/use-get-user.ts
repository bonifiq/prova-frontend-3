import type { UserDataResponse } from "../../dtos/user-data/user-data-response";
import type { UserInfoResponse } from "../../dtos/user-infos/user-infos-response";
import { GetUserData } from "../../services/user-data/get-user-data";
import { GetUserInfos } from "../../services/user-infos/get-user-infos";

interface useGetUserProps {
  setIsLoading(isLoading: boolean): void;
  setUserInfo(userInfo: UserInfoResponse): void;
  setUserData(userData: UserDataResponse): void;
  setUserError(isErrorOccured: boolean): void;
}

interface GetUserProps {
  userId: number;
}

interface useGerUserReturn {
  GetUser: (data: GetUserProps) => Promise<void>;
}

export function useGetUser({
  setIsLoading,
  setUserInfo,
  setUserData,
  setUserError,
}: useGetUserProps): useGerUserReturn {
  async function GetUser(data: GetUserProps) {
    setIsLoading(true);
    try {
      const [userInfo, userData] = await Promise.all([
        GetUserInfos({ userId: data.userId }),
        GetUserData({ userId: data.userId }),
      ]);

      if (!userInfo || !userData) {
        setUserError(true);
        return;
      }

      setUserInfo(userInfo);
      setUserData(userData);
    } catch (error) {
      console.log("[GetUser] - Error: ", error);
      setUserError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { GetUser };
}
