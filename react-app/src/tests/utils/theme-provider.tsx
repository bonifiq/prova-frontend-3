import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme/theme';
import type { ReactElement, JSXElementConstructor } from 'react';

export function withThemeProvider<P extends {}>(
  Component: JSXElementConstructor<P>
): (props: P) => ReactElement {
  return function WrappedComponent(props: P): ReactElement {
    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}
