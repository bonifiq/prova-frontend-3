// filepath: c:\Projetos\prova-frontend-3\react-app\src\setupTests.ts
import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

// Mock do ResizeObserver (necessário para o Mantine)
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock do IntersectionObserver (necessário para alguns componentes do Mantine)
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock do postMessage
Object.defineProperty(window, "postMessage", {
  writable: true,
  value: vi.fn(),
});

// Mock do parent
Object.defineProperty(window, "parent", {
  writable: true,
  value: {
    postMessage: vi.fn(),
    loggedUserId: null,
  },
});

// Mock do matchMedia (para temas do Mantine)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeAll(() => {
  // Configurar viewport para testes
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 768,
  });
});
