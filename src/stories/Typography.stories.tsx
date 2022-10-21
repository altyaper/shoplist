import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { withThemeProvider } from './decorators/ThemeProvider';
import { Typography } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Theme/Typography',
  component: Typography,
  decorators: [withThemeProvider]
} as ComponentMeta<typeof Typography>;

export const h2 = () => <Typography variant='h2'>H2</Typography>;