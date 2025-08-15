export type TypographyProps = {
  variant?: Variant;
  color?: string;
  hasMargin?: boolean;
  children: React.ReactNode;
}

export const TypographyVariants = {
  TITLE: 'h4',
  PARAGRAPH: 'p',
} as const;

export type Variant = typeof TypographyVariants[keyof typeof TypographyVariants];