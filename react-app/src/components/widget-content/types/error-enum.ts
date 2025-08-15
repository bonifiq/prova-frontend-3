export const ErrorKey = {
  USER: 'user',
  CONTENT: 'content',
} as const;

export type ErrorKey = typeof ErrorKey[keyof typeof ErrorKey];
