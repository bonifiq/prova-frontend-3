import type { ReactElement } from "react";
import * as S from './list-item.styles';
import type { ListItemType } from "./types";
import { Typography } from "../typography/typography";
import { TypographyVariants } from "../typography/types";

export const ListItem = ({ info, label }: ListItemType): ReactElement => {
    return (
        <S.InfoWrapper>
            <Typography variant={TypographyVariants.TITLE} hasMargin={false}>{label}</Typography>
            <Typography variant={TypographyVariants.PARAGRAPH} hasMargin={false}>{info}</Typography>
        </S.InfoWrapper>
    )
}