import { render, screen } from '@testing-library/react';
import { WidgetContentLayout } from '../../components/widget-content/widget-content.layout';
import { INITIAL_ERROR, INITIAL_USER_DATA } from '../../components/widget-content/constants';
import { mockContent, mockContentError, mockUser, mockUserError } from './constants';
import { withThemeProvider } from '../utils/theme-provider';

describe('WidgetContentLayout', () => {
  it('Should render component', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={true}
        isContentLoading={true}
        user={INITIAL_USER_DATA}
        content={[]}
        handleClose={() => { }}
        error={INITIAL_ERROR}
      />
    );

    expect(screen.getByTestId('widget-content-wrapper')).toBeDefined();
  });

  it('Should render skeleton when is loading', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={true}
        isContentLoading={true}
        user={INITIAL_USER_DATA}
        content={[]}
        handleClose={() => { }}
        error={INITIAL_ERROR}
      />
    );

    const userSkeletons = screen.getAllByTestId('user-skeleton');
    const contentSkeleton = screen.getAllByTestId('content-skeleton');

    expect(userSkeletons.length).toBe(2);
    expect(contentSkeleton.length).toBe(1)
  });

  it('Should render user data', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={false}
        isContentLoading={false}
        user={mockUser}
        content={[]}
        handleClose={() => { }}
        error={INITIAL_ERROR}
      />
    );

    const userData = screen.queryByText(mockUser.name);
    expect(userData).toBeTruthy();
  });

  it('Should render error when user data is not found', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={false}
        isContentLoading={false}
        user={mockUser}
        content={[]}
        handleClose={() => { }}
        error={mockUserError}
      />
    );

    const userError = screen.queryByText(mockUserError.user);
    expect(userError).toBeTruthy();
  });

  it('Should render content data', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={false}
        isContentLoading={false}
        user={INITIAL_USER_DATA}
        content={mockContent}
        handleClose={() => { }}
        error={INITIAL_ERROR}
      />
    );

    const contentData = screen.queryByText(mockContent[0].title);
    expect(contentData).toBeTruthy();
  });

    it('Should render error when content data is not found', () => {
    const ThemedWidget = withThemeProvider(WidgetContentLayout);

    render(
      <ThemedWidget
        isUserLoading={false}
        isContentLoading={false}
        user={mockUser}
        content={[]}
        handleClose={() => { }}
        error={mockContentError}
      />
    );

    const contentError = screen.queryByText(mockContentError.content);
    expect(contentError).toBeTruthy();
  });
});
