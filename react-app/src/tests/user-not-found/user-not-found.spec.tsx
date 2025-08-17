import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import UserNotFound from "../../components/user-not-found";

test("should render user not found component", () => {
  render(<UserNotFound />);

  expect(screen.getByText("Ops! Usuário não encontrado.")).toBeInTheDocument();
});
