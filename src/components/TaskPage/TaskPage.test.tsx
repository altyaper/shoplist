// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { describe, expect, it } from 'vitest';
import '../../app/i18n';
import { store } from '../../app/store';
import { theme } from '../../themes/theme';
import { TaskPage } from './TaskPage';

describe('TaskPage photo import', () => {
  it('opens the photo importer from the main screen', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskPage />
        </ThemeProvider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Scan photo with AI' }));

    expect(await screen.findByText('Import from photo')).toBeInTheDocument();
    expect(screen.getByLabelText('Take photo')).toHaveAttribute('capture', 'environment');
    expect(screen.getByLabelText('Choose photo')).not.toHaveAttribute('capture');
  });
});
