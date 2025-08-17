import { jsonPlaceHolderService } from "..";
import type { UserDataRequest } from "../../dtos/user-data/user-data-request";
import { UserDataResponse } from "../../dtos/user-data/user-data-response";

export async function GetUserData(
  data: UserDataRequest
): Promise<UserDataResponse | null> {
  try {
    const response = await jsonPlaceHolderService.get("/posts", {
      params: { userId: data.userId },
    });
    return new UserDataResponse(response.data);
  } catch (error) {
    console.log("[GetUserData] - Error: ", error);
    return null;
  }
}
