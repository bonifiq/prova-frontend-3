import * as S from './widget-content.styles'
import { type ReactElement } from 'react';
import { theme } from '../../theme/theme';
import type { WidgetContentLayoutProps } from './types/props';
import { ListItem } from '../list-item/list-item';
import { Skeleton } from '@mui/material';

export const WidgetContentLayout = ({ handleClose, user, content, isUserLoading, isContentLoading }: WidgetContentLayoutProps): ReactElement => {
    const scrollBarColor = theme.palette.primary.dark;

    const renderUserInfoContent = (): ReactElement => {
        return (
            <>
                {isUserLoading ? (
                    <S.UserInfoSkeletonWrapper>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />
                    </S.UserInfoSkeletonWrapper>
                ) : (
                    <div>
                        <ListItem label="Nome:" info={user?.name} />
                        <ListItem label="Email:" info={user?.email} />
                    </div>
                )}
            </>
        );
    };

    const renderContent = (): ReactElement => {
        return (
            <>
                {isContentLoading ? (
                    <Skeleton variant="rounded" width="100%" height={120} />
                ) : (
                    content?.map((data, index) => (
                        <S.ContentWrapper key={index}>
                            <S.Title>{data.title}</S.Title>
                            <S.Message>{data.body}</S.Message>
                        </S.ContentWrapper>
                    ))
                )}
            </>
        );

    };


    return (
        <div>
            <S.ModalHeader>
                <S.RowWrapper>
                    {renderUserInfoContent()}
                    <S.CloseButton onClick={handleClose}>
                        <S.CloseIcon />
                    </S.CloseButton>
                </S.RowWrapper>
            </S.ModalHeader>
            <S.ScrollContent scrollBarColor={scrollBarColor}>
                {renderContent()}
            </S.ScrollContent>
        </div>
    );
}