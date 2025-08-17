import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import UserInfos from "../../components/user-infos";
import type { UserInfoResponse } from "../../dtos/user-infos/user-infos-response";
import * as userService from "../../services/user-infos/get-user-infos";

vi.mock("../../services/user-infos/get-user-infos");

test("should render user info calling service in test", async () => {
  const getUserInfosMock = vi
    .spyOn(userService, "GetUserInfos")
    .mockResolvedValue({
      name: "Jean Junior Ros",
      email: "junior7511@hotmail.com",
    });

  const data = (await userService.GetUserInfos({
    userId: 0,
  })) as UserInfoResponse;

  expect(data.name).toBe("Jean Junior Ros");
  render(<UserInfos name={data.name} email={data.email} isLoading={false} />);
  expect(screen.getByText("Nome: Jean Junior Ros")).toBeInTheDocument();
  expect(getUserInfosMock).toHaveBeenCalledTimes(1);
});

test("should render loading for user infos", () => {
  const { container } = render(<UserInfos isLoading={true} />);

  const skeleton = container.querySelector(".react-loading-skeleton");
  expect(skeleton).toBeInTheDocument();
});
