import { TypographyVariants, type TypographyProps } from './types';
import type { ReactElement } from 'react';
import * as S from './typography.styles'

export const Typography = ({
  variant = TypographyVariants.PARAGRAPH,
  children,
  color,
  hasMargin = true
}: TypographyProps):ReactElement => {
  return (
    <S.StyledTypography as={variant} variant={variant} color={color} hasMargin={hasMargin}>
      {children}
    </S.StyledTypography>
  );
};
