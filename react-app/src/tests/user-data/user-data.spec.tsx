import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import UserData from "../../components/user-data";
import * as userService from "../../services/user-data/get-user-data";
import type { UserDataResponse } from "../../dtos/user-data/user-data-response";

vi.mock("../../services/user-data/get-user-data");

test("should render user data calling service in test", async () => {
  const getUserDataMock = vi
    .spyOn(userService, "GetUserData")
    .mockResolvedValue({
      userData: [{ title: "Title test", body: "Body test" }],
    });

  const data = (await userService.GetUserData({
    userId: 0,
  })) as UserDataResponse;

  expect(data.userData[0].title).toBe("Title test");
  render(<UserData isLoading={false} userDataList={data.userData} />);
  expect(screen.getByText("Title test")).toBeInTheDocument();
  expect(getUserDataMock).toHaveBeenCalledTimes(1);
  screen.getByTestId("user-data-list");
});

test("should render loading for user data", () => {
  render(
    <UserData
      isLoading={true}
      userDataList={[{ title: "Test", body: "Test body" }]}
    />
  );

  screen.getByTestId("user-data-loading");
});

test("should render a empty list", () => {
  render(<UserData isLoading={false} userDataList={[]} />);

  expect(screen.getByText("List is empty...")).toBeInTheDocument();
});
