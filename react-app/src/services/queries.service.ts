// filepath: react-app/src/services/queries.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "./api.service";
import type { Post, User } from "../types";

// Query para buscar dados do usuário
export const useUserQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<User> => {
      if (!userId) throw new Error("User ID is required");
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId && userId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Query para buscar posts do usuário
export const useUserPostsQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: async (): Promise<Post[]> => {
      if (!userId) throw new Error("User ID is required");
      const response = await api.get<Post[]>(`/posts?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId && userId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
