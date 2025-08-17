import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Header from "../../components/header";
import "@testing-library/jest-dom/vitest";

test("should render header component", () => {
  render(<Header />);

  const header = screen.getByTestId("header-container");
  expect(header).toHaveTextContent("BonifiQ - Prova frontend");
});
