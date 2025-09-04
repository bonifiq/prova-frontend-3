import { render, screen } from "@testing-library/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Card } from "./Card";
import { describe, expect, it } from "vitest";

const theme = createTheme({});

const renderWithMantine = (component: React.ReactElement) => {
  return render(<MantineProvider theme={theme}>{component}</MantineProvider>);
};

describe("Card Component", () => {
  it("should render loading skeleton when loading is true", () => {
    renderWithMantine(<Card title="" content="" loading={true} />);

    // Verificar se há skeletons pela classe CSS do Mantine
    const skeletons = document.querySelectorAll(".mantine-Skeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render title and content when provided", () => {
    const title = "Test Title";
    const content = "Test content for the card component";

    renderWithMantine(<Card title={title} content={content} loading={false} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("should be wrapped in Paper component", () => {
    renderWithMantine(<Card title="Test" content="Content" loading={false} />);

    // O Paper adiciona uma classe específica
    const paper = document.querySelector(".mantine-Paper-root");
    expect(paper).toBeInTheDocument();
  });

  it("should render empty card when no content", () => {
    renderWithMantine(<Card title="" content="" loading={false} />);

    // Deve ainda renderizar o Paper mesmo sem conteúdo
    const paper = document.querySelector(".mantine-Paper-root");
    expect(paper).toBeInTheDocument();
  });
});
