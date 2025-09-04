import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserQuery, useUserPostsQuery } from "./queries.service";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { User, Post } from "../types";

// Mock do axios - sem usar variáveis externas
vi.mock("./api.service", () => ({
  api: {
    get: vi.fn(),
  },
}));

// Importar após o mock para pegar a versão mockada
import { api } from "./api.service";

// Agora podemos tipar o mock
const mockGet = vi.mocked(api.get);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Importante: desabilitar retry para testes de erro
        gcTime: 0, // Não cachear para testes
        staleTime: 0, // Não usar cache stale
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("API Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUserQuery", () => {
    it("should not fetch when userId is null", () => {
      const { result } = renderHook(() => useUserQuery(null), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockGet).not.toHaveBeenCalled();
    });

    it("should fetch user data when userId is provided", async () => {
      const mockUser: User = {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        username: "joao",
        phone: "123456789",
        website: "joao.com",
        company: { name: "Test Company", catchPhrase: "Test", bs: "Test" },
        address: {
          street: "Test Street",
          suite: "Test Suite",
          city: "Test City",
          zipcode: "12345",
          geo: { lat: "0", lng: "0" },
        },
      };

      mockGet.mockResolvedValueOnce({ data: mockUser });

      const { result } = renderHook(() => useUserQuery(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUser);
      expect(mockGet).toHaveBeenCalledWith("/users/1");
    });
  });

  describe("useUserPostsQuery", () => {
    it("should not fetch when userId is null", () => {
      const { result } = renderHook(() => useUserPostsQuery(null), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockGet).not.toHaveBeenCalled();
    });

    it("should fetch posts when userId is provided", async () => {
      const mockPosts: Post[] = [
        { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
        { id: 2, userId: 1, title: "Post 2", body: "Content 2" },
      ];

      mockGet.mockResolvedValueOnce({ data: mockPosts });

      const { result } = renderHook(() => useUserPostsQuery(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockPosts);
      expect(mockGet).toHaveBeenCalledWith("/posts?userId=1");
    });

    it("should verify mock is working", () => {
      mockGet.mockReturnValueOnce(Promise.resolve({ data: { test: true } }));

      const result = mockGet("/test");

      expect(mockGet).toHaveBeenCalledWith("/test");
      expect(result).resolves.toEqual({ data: { test: true } });
    });
  });
});
