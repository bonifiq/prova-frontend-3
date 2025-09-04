import { render, screen } from "@testing-library/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Header } from "./Header";
import { describe, expect, it } from "vitest";

const theme = createTheme({});

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider theme={theme}>{component}</MantineProvider>);
};

describe("Header Component", () => {
  it("should render loading state when loading is true", () => {
    renderWithMantine(<Header loading={true} />);

    // Verificar se há skeletons pela classe CSS do Mantine
    const skeletons = document.querySelectorAll(".mantine-Skeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render user name and email when data is provided", () => {
    renderWithMantine(
      <Header name="João Silva" email="joao@email.com" loading={false} />
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("joao@email.com")).toBeInTheDocument();
  });

  it("should render default text when no data is provided", () => {
    renderWithMantine(<Header loading={false} />);

    expect(screen.getByText("Nome não informado")).toBeInTheDocument();
    expect(screen.getByText("Email não informado")).toBeInTheDocument();
  });

  it("should render avatar container", () => {
    renderWithMantine(
      <Header name="João" email="joao@test.com" loading={false} />
    );

    // Verifica se há um Paper container
    const paper = document.querySelector(".mantine-Paper-root");
    expect(paper).toBeInTheDocument();
  });
});
