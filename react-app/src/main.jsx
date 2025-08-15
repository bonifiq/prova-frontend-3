import React from 'react';
import ReactDOM from 'react-dom/client';
import { WidgetContent } from './components/widget-content/widget-content';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';

let widgetContent = document.getElementById('widget-container');
if (!widgetContent) {
  widgetContent = document.createElement('div');
  widgetContent.id = 'widget-container';
  document.body.appendChild(widgetContent);
}

ReactDOM.createRoot(widgetContent).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WidgetContent />
    </ThemeProvider>
  </React.StrictMode>
);