import type { ReactElement } from "react";
import * as S from './list-item.styles';
import type { ListItemType } from "./types";

export const ListItem = ({ info, label }: ListItemType): ReactElement => {
    return (
        <S.InfoWrapper>
            <S.Title>{label}</S.Title>
            <S.Message>{info}</S.Message>
        </S.InfoWrapper>
    )
}