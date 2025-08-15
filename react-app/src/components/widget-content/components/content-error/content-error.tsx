import type { ReactElement } from "react";
import * as S from './content-error.styles'
import type { ContentErrorLayoutProps } from "./types";
import { Typography } from "../../../typography/typography";
import { TypographyVariants } from "../../../typography/types";

export const ContentError = ({ message }: ContentErrorLayoutProps): ReactElement => {
    return (
        <S.Wrapper>
            <Typography variant={TypographyVariants.TITLE}>{message}</Typography>
        </S.Wrapper>
    )
}