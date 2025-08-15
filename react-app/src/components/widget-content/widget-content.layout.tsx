import * as S from './widget-content.styles'
import { type ReactElement } from 'react';
import { theme } from '../../theme/theme';
import type { WidgetContentLayoutProps } from './types/props';
import { ListItem } from '../list-item/list-item';
import { Skeleton } from '@mui/material';
import { UserError } from './components/user-error/user-error';
import { ContentError } from './components/content-error/content-error';
import { Typography } from '../typography/typography';
import { TypographyVariants } from '../typography/types';

export const WidgetContentLayout = ({ handleClose, user, content, isUserLoading, isContentLoading, error }: WidgetContentLayoutProps): ReactElement => {
    const palette = theme.palette;

    const renderUserInfoContent = (): ReactElement => {
        return (
            <>
                {isUserLoading ? (
                    <S.UserInfoSkeletonWrapper>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" data-testid="user-skeleton"/>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" data-testid="user-skeleton"/>
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

    const renderContentData = (): ReactElement => {
        return (
            <>
                {isContentLoading ? (
                    <Skeleton variant="rounded" width="100%" height={120} data-testid="content-skeleton"/>
                ) : (
                    content?.map((data, index) => (
                        <S.ContentWrapper key={index}>
                            <Typography variant={TypographyVariants.TITLE}>{data.title}</Typography>
                            <Typography color={palette.primary.lightest}>{data.body}</Typography>
                        </S.ContentWrapper>
                    ))
                )}
            </>
        );
    };

    return (
        <div data-testid='widget-content-wrapper'>
            <S.ModalHeader>
                <S.RowWrapper>
                    {error.user ? <UserError message={error.user}/> : renderUserInfoContent()}
                    <S.CloseButton onClick={handleClose}>
                        <S.CloseIcon />
                    </S.CloseButton>
                </S.RowWrapper>

            </S.ModalHeader>
            <S.ScrollContent scrollBarColor={palette.primary.dark}>
                {error.content ? <ContentError message={error.content}/> : renderContentData()}
            </S.ScrollContent>
        </div>
    );
}