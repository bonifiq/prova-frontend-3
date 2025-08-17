import { jsonPlaceHolderService } from "..";
import type { UserInfoRequest } from "../../dtos/user-infos/user-infos-request";
import { UserInfoResponse } from "../../dtos/user-infos/user-infos-response";

export async function GetUserInfos(
  data: UserInfoRequest
): Promise<UserInfoResponse | null> {
  try {
    const response = await jsonPlaceHolderService.get(`/users/${data.userId}`);
    return new UserInfoResponse(response.data.name, response.data.email);
  } catch (error) {
    console.log("[GetUserInfos] - Error: ", error);
    return null;
  }
}
