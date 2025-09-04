import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Widget } from "./Widget";
import { beforeEach, describe, expect, it, vi } from "vitest";

const theme = createTheme({});

// Mock das queries
vi.mock("../../services", () => ({
  useUserQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useUserPostsQuery: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
};

describe("Widget Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset window.parent mock
    Object.defineProperty(window, "parent", {
      writable: true,
      value: {
        postMessage: vi.fn(),
        loggedUserId: null,
      },
    });
  });

  it("should render widget header", () => {
    render(<Widget />, { wrapper: createWrapper() });

    expect(screen.getByText("Widget do Usuário")).toBeInTheDocument();
  });

  it("should render close button", () => {
    render(<Widget />, { wrapper: createWrapper() });

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("should show error message when no userId is found", async () => {
    render(<Widget />, { wrapper: createWrapper() });

    // Aguardar o timeout
    await waitFor(
      () => {
        expect(
          screen.getByText("Erro ao carregar conteúdo")
        ).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it("should handle postMessage with userId", () => {
    render(<Widget />, { wrapper: createWrapper() });

    // Simular recebimento de postMessage
    fireEvent(
      window,
      new MessageEvent("message", {
        data: { type: "SET_USER_ID", userId: 1 },
      })
    );

    // O widget deve estar presente
    expect(screen.getByText("Widget do Usuário")).toBeInTheDocument();
  });

  it("should call parent postMessage when close button is clicked", () => {
    const mockPostMessage = vi.fn();
    Object.defineProperty(window, "parent", {
      writable: true,
      value: {
        postMessage: mockPostMessage,
        loggedUserId: 1,
      },
    });

    render(<Widget />, { wrapper: createWrapper() });

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockPostMessage).toHaveBeenCalledWith({ type: "CLOSE_WIDGET" }, "*");
  });
});
